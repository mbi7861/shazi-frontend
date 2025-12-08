"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { validateCheckoutForm } from "../utils/validation";
import Navbar from "@/components/Navbar";
import { apiServiceService } from "@/app/utils/apiService";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutOrderSummary from "@/components/checkout/CheckoutOrderSummary";
import CheckoutSkeleton from "@/components/checkout/CheckoutSkeleton";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartAmount, isCartLoading } = useCart();
  const { userData } = useAuth();
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "Rs";
  const stripeRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: userData?.email || "",
    country: "Pakistan",
    firstName: userData?.first_name || "",
    lastName: userData?.last_name || "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: userData?.phone || "",
    shippingMethod: "standard",
    paymentMethod: "cod",
    sameAsBilling: true,
    discountCode: "",
  });

  const [errors, setErrors] = useState({});
  const shippingCost = 0;
  const subtotal = cartAmount || 0;
  const total = subtotal + shippingCost;

  useEffect(() => {
    if (isCartLoading) return;
    if (cartItems.length === 0) {
      toast.error("Cart is empty. Please add items first.");
      router.replace("/cart");
    }
  }, [isCartLoading, cartItems]);

  useEffect(() => {
    const savedData = localStorage.getItem("checkoutFormData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData((prev) => ({ ...prev, ...parsedData }));
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("checkoutFormData", JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleAddressSelect = (selectedAddress) => {
    setFormData((prev) => ({
      ...prev,
      address: selectedAddress.address,
      apartment: selectedAddress.apartment,
      city: selectedAddress.city,
      country: selectedAddress.country,
      firstName: selectedAddress.first_name,
      lastName: selectedAddress.last_name,
      postalCode: selectedAddress.postal_code,
      phone: selectedAddress.phone,
    }));
    toast.success("Address selected");
  };

  const handleValidation = () => {
    try {
      const validationResult = validateCheckoutForm(formData);
      setErrors({});
      return { success: true, data: validationResult };
    } catch (error) {
      if (error.errors) {
        const formattedErrors = {};
        error.errors.forEach((err) => {
          const field = err.path[0];
          formattedErrors[field] = err.message;
        });
        setErrors(formattedErrors);
      }
      toast.error("Please fix the errors in the form.");
      return { success: false, errors: formattedErrors };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = handleValidation();
    if (!validation.success) {
      return;
    }
    if (formData.paymentMethod == "card") {
      const paymentMethodId = await stripeRef.current?.getPaymentMethodId();
      if (!paymentMethodId) {
        return;
      }
    }

    setIsLoading(true);

    try {
      const storedCart = localStorage.getItem("cart");
      const orderItems = storedCart ? JSON.parse(storedCart) : {};

      const orderItemsArray = Object.entries(orderItems).map(
        ([itemId, cartItem]) => {
          const fullItem = cartItems.find(
            (item) => item.id === parseInt(itemId)
          );
          return {
            product_item_id: parseInt(itemId),
            product_id: cartItem.product_id || fullItem?.product?.id,
            quantity: cartItem.quantity || 1,
            price: fullItem?.price?.discounted_price || 0,
            currency: fullItem?.price?.currency || currency || "PKR",
          };
        }
      );

      const orderData = {
        customer: {
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
        },
        shipping_address: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          postal_code: formData.postalCode,
          country: formData.country,
          phone: formData.phone,
        },
        items: orderItemsArray,
        shipping_method: formData.shippingMethod,
        payment_method: formData.paymentMethod,
        discount_code: formData.discountCode,
        subtotal: subtotal,
        shipping_cost: shippingCost,
        total: total,
        currency: currency || "PKR",
        // Add Stripe payment method ID if card payment
        ...(formData.paymentMethod === "card" && {
          stripe_payment_method_id:
            await stripeRef.current?.getPaymentMethodId(),
        }),
      };

      // Send to API Service via our Next.js API route
      const result = await apiServiceService.createOrder(orderData);

      if (!result.success) {
        throw new Error(result.error || "Failed to create order");
      }

      toast.success(
        `Order Placed Successfully! Order ID: ${
          result.data.order_id || result.data.id
        }`
      );

      // Clear localStorage after successful order
      localStorage.removeItem("checkoutFormData");
      localStorage.removeItem("cart");

      // Redirect to success page
      router.push(
        `/order-placed?orderId=${result.data.order_id || result.data.id}`
      );
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error(
        error.message ||
          "There was an error processing your order. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isCartLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <CheckoutSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          <CheckoutForm
            formData={formData}
            errors={errors}
            isLoading={isLoading}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            stripePromise={stripePromise}
            stripeRef={stripeRef}
            onAddressSelect={handleAddressSelect}
          />

          <CheckoutOrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            shippingCost={shippingCost}
            total={total}
            currency={currency}
          />
        </div>
      </div>
    </div>
  );
}
