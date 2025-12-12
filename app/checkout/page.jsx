"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { validateEmail } from "../utils/validation";
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
    shippingMethod: "standard",
    paymentMethod: "cod",
    sameAsBilling: true,
    discountCode: "",
    address_id: null
  });

  const [errors, setErrors] = useState({});
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const shippingCost = 0;
  const subtotal = cartAmount || 0;
  const total = subtotal + shippingCost;
  const isLoggedIn = !!userData;

  useEffect(() => {
    if (isCartLoading) return;
    if (cartItems.length === 0) {
      toast.error("Cart is empty. Please add items first.");
      router.replace("/cart");
    }
  }, [isCartLoading, cartItems]);

  // Clear guest address when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      setSelectedAddressId(null);
      setFormData((prev) => ({ ...prev, address_id: null }));
    }
  }, [isLoggedIn]);

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
    if (selectedAddress.id) {
      setSelectedAddressId(selectedAddress.id);
      setFormData((prev) => ({
        ...prev,
        address_id: selectedAddress.id,
      }));
      // toast.success("Address selected");
    }
  };

  const handleValidation = () => {
    // Only validate email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      setErrors({ email: emailValidation.error });
      toast.error("Please enter a valid email address.");
      return { success: false, errors: { email: emailValidation.error } };
    }
    
    // Check if address is selected
    if (!formData.address_id) {
      setErrors({ address_id: "Please select an address" });
      toast.error("Please select a shipping address.");
      return { success: false, errors: { address_id: "Please select an address" } };
    }

    setErrors({});
    return { success: true };
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
        },
        address_id: formData.address_id,
        items: orderItemsArray,
        shipping_method: formData.shippingMethod,
        payment_method: formData.paymentMethod,
        discount_code: formData.discountCode,
        subtotal: subtotal,
        shipping_cost: shippingCost,
        total: total,
        currency: currency || "PKR",
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
            userData={userData}
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
