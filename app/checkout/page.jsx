"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { orderService } from "@/services/orderService";
import { validateEmail } from "../utils/validation";
import Navbar from "@/components/Navbar";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutOrderSummary from "@/components/checkout/CheckoutOrderSummary";
import CheckoutSkeleton from "@/components/checkout/CheckoutSkeleton";
import { shippingService } from "@/services/shippingService";
import { countries, getStatesByCountry } from "@/lib/countriesStates";
import { startTransition } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartAmount, isCartLoading, clearCart } = useCart();
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
  const [idempotencyKey, setIdempotencyKey] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [isShippingLoading, setIsShippingLoading] = useState(false);
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
      setSelectedAddress(null);
      setFormData((prev) => ({
        ...prev,
        address_id: null,
        email: userData?.email || prev.email,
      }));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!userData?.email) return;
    setFormData((prev) => ({ ...prev, email: userData.email }));
  }, [userData?.email]);

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

  useEffect(() => {
    if (!selectedAddress) return;
    calculateShippingForAddress(selectedAddress);
  }, [selectedAddress, cartItems]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleAddressSelect = (selectedAddress) => {
    if (selectedAddress.id) {
      setSelectedAddressId(selectedAddress.id);
      setSelectedAddress(selectedAddress);
      setFormData((prev) => ({
        ...prev,
        address_id: selectedAddress.id,
      }));
    }
  };

  const getCountryCode = (address) => {
    const rawCountry = address?.country_code || address?.country || "PK";
    if (rawCountry.length === 2) return rawCountry.toUpperCase();

    const matchedCountry = countries.find(
      (country) => country.name.toLowerCase() === rawCountry.toLowerCase()
    );
    return matchedCountry?.code || "PK";
  };

  const getStateCode = (address) => {
    if (address?.state_code) return address.state_code;

    const rawState = address?.state || "";
    const countryCode = getCountryCode(address);
    const states = getStatesByCountry(countryCode);
    const matchedState = states.find(
      (state) =>
        state.code.toUpperCase() === rawState.toUpperCase() ||
        state.name.toLowerCase() === rawState.toLowerCase()
    );

    return matchedState?.code || rawState;
  };

  const calculateShippingForAddress = async (address) => {
    if (!address || cartItems.length === 0) {
      setShippingCost(0);
      return;
    }

    const items = cartItems.map((item) => ({
      product_item_id: item.product_item_id ?? item.id,
      quantity: item.quantity || 1,
    }));

    const stateCode = getStateCode(address);
    const city = address.city || "";

    setIsShippingLoading(true);
    try {
      const result = await shippingService.calculateShipping({
        items,
        city,
        stateCode,
      });

      if (!result.success) {
        toast.error(result.message || "Unable to calculate shipping");
        setShippingCost(0);
        return;
      }

      const shippingAmount =
        result.data?.shipping_cost ?? result.data?.shippingCost ?? 0;
      setShippingCost(Number(shippingAmount) || 0);
    } catch (error) {
      console.error("Shipping calculation error:", error);
      toast.error("Unable to calculate shipping");
      setShippingCost(0);
    } finally {
      setIsShippingLoading(false);
    }
  };

  const handleValidation = () => {
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      setErrors({ email: emailValidation.error });
      toast.error("Please enter a valid email address.");
      return { success: false, errors: { email: emailValidation.error } };
    }
        if (!formData.address_id) {
      setErrors({ address_id: "Please select an address" });
      toast.error("Please select a shipping address.");
      return { success: false, errors: { address_id: "Please select an address" } };
    }

    setErrors({});
    return { success: true };
  };

useEffect(() => {
  const key = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  setIdempotencyKey(key);
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const validation = handleValidation();
  if (!validation.success) {
    return;
  }  
  if (formData.paymentMethod === "card") {
    const paymentMethodId = await stripeRef.current?.getPaymentMethodId();
    if (!paymentMethodId) {
      toast.error("Please enter valid card details");
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
      idempotency_key: idempotencyKey,
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

    const result = await orderService.createOrder(orderData);    
    if (!result.success) {
      console.log(result);
      if (result.errors && Object.keys(result.errors).length > 0) {
        const errorMessages = Object.values(result.errors)
          .flat()
          .join(", ");
        console.log('errorMessages', errorMessages);
        toast.error(errorMessages || "Please fix the errors in the form");
      } else {
        toast.error(result.message || "Failed to create order");
      }
      return;
    }
    localStorage.removeItem("checkoutFormData");

    
    startTransition(() => {
      router.replace(`/order-placed?order_id=${result.data}`);
    });
    toast.success("Order Placed successfully");
    clearCart();
    window.dispatchEvent(new Event('cartUpdated'));
  } catch (error) {
    console.error("Order submission error:", error);
    toast.error( error.message ||  "There was an error processing your order. Please try again.");
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
            isShippingLoading={isShippingLoading}
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
            isShippingLoading={isShippingLoading}
          />
        </div>
      </div>
    </div>
  );
}
