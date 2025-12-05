"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect, useRef } from "react";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { getImageUrl } from "@/app/utils/utils";
import { validateCheckoutForm } from "../utils/validation";
import Navbar from "@/components/Navbar";
import StripeCardForm from "@/components/StripeCardForm";
import Image from "next/image";
import { apiServiceService } from "@/app/utils/apiService";
import AddressList from "@/components/AddressList";
// import { formattedErrors } from "@/lib/formattedErrors" // Declare the variable before using it
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartAmount, cartLoading } = useCart();
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
    if (!cartItems.length) {
      toast.error(
        "Cart is empty. Please add items to your cart before checkout."
      );
      redirect("/cart");
    }
  }, [cartItems]);

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

  const applyDiscount = async () => {
    if (!formData.discountCode) return;

    try {
      const result = await apiServiceService.applyDiscount(
        formData.discountCode
      );

      if (result.success) {
        toast.success(`${result.data.discount}% discount applied!`);
        // You can update the total here if the API returns updated pricing
        if (result.data.updated_total) {
          // Update the total with discount applied
          // This would require state management for the total
        }
      } else {
        toast.error(
          result.error || "The discount code you entered is not valid."
        );
      }
    } catch (error) {
      console.error("Discount error:", error);
      toast.error("There was an error applying the discount.");
    }
  };

  // Show loading or redirect if cart is empty
  // if (cartCount === 0) {
  //     return (
  //         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //             <div className="text-center">
  //                 <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
  //                 <button onClick={() => router.push("/")}>Continue Shopping</button>
  //             </div>
  //         </div>
  //     )
  // }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* Form Section - 70% */}
          <div className="lg:w-3/5">
            <div className="bg-white rounded shadow-md p-6">
              <p className="text-2xl md:text-3xl text-gray-500 mb-6">
                Shipping{" "}
                <span className="font-semibold text-orange-600"> Address</span>
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <AddressList
                  onSelect={(selectedAddress) => {
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
                  }}
                />

                {/* Payment Method */}
                <div className="space-y-4">
                  <p className="text-2xl md:text-3xl text-gray-500 my-6">
                    Payment{" "}
                    <span className="font-semibold text-orange-600">
                      {" "}
                      Method
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    All transactions are secure and encrypted.
                  </p>
                  <div className="space-y-4">
                    <div className="border rounded p-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="cod"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === "cod"}
                          onChange={(e) =>
                            handleInputChange("paymentMethod", e.target.value)
                          }
                        />
                        <label htmlFor="cod" className="font-medium">
                          Cash on Delivery (COD)
                        </label>
                      </div>
                    </div>

                    <div className="border rounded p-4 bg-blue-50 border-blue-200">
                      <div className="flex items-center space-x-2 ">
                        <input
                          type="radio"
                          id="bank"
                          name="paymentMethod"
                          value="bank"
                          checked={formData.paymentMethod === "bank"}
                          onChange={(e) =>
                            handleInputChange("paymentMethod", e.target.value)
                          }
                        />
                        <label htmlFor="bank" className="font-medium">
                          Bank Deposit
                        </label>
                      </div>

                      {formData.paymentMethod === "bank" && (
                        <div className="ml-6 space-y-2 text-sm">
                          <p>
                            <strong>
                              Bank Deposit (Meezan Bank) – Pay via bank transfer
                            </strong>
                          </p>
                          <p>
                            Transfer the total to our Meezan Bank account. Your
                            order will be processed once payment is confirmed.
                          </p>
                          <div className="mt-3 space-y-1">
                            <p>
                              <strong>Bank:</strong> Meezan Bank
                            </p>
                            <p>
                              <strong>Account Title:</strong> Dilawar Traders
                            </p>
                            <p>
                              <strong>Account Number:</strong> 10010103943364
                            </p>
                            <p>
                              <strong>IBAN:</strong> PK26MEZN0010103903994
                            </p>
                          </div>

                          <div className="mt-4 space-y-2">
                            <p className="font-medium text-red-600">
                              📌 Important Instructions:
                            </p>
                            <div className="space-y-1 text-xs">
                              <p>
                                📱 Share a screenshot or receipt of your payment
                                to our WhatsApp: 0331-6801200
                              </p>
                              <p>
                                📝 Include your Order Number as the payment
                                reference
                              </p>
                              <p>
                                ✅ Make the payment within 48 hours of placing
                                your order
                              </p>
                              <p>
                                ✅ We'll confirm your order once the payment is
                                received and verified
                              </p>
                            </div>
                          </div>

                          <div className="mt-3 text-xs">
                            <p>For any help, contact us at:</p>
                            <p>
                              📞 0492722500 📱 0331-6801200 📧
                              contact@dilawarTraders.pk
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Card Payment */}
                    <div className="border rounded p-4 bg-green-50 border-green-200">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="card"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === "card"}
                          onChange={(e) =>
                            handleInputChange("paymentMethod", e.target.value)
                          }
                        />
                        <label htmlFor="card" className="font-medium">
                          Pay with Card
                        </label>
                      </div>

                      {formData.paymentMethod === "card" && (
                        <div className=" mt-4">
                          <Elements stripe={stripePromise}>
                            <StripeCardForm ref={stripeRef} />
                          </Elements>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-5 mt-5 hover:bg-orange-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <LoadingSpinner /> Processing...
                    </span>
                  ) : (
                    "Complete order"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Summary Section - 30% */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <p className="text-2xl md:text-2xl text-gray-500 mb-6">
                Order{" "}
                <span className="font-semibold text-orange-600"> Summary</span>
              </p>
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const product = item.product || {};
                  const imageUrl =
                    product.primary_image ||
                    product.images?.find((img) => img.is_preview)?.uuid ||
                    product.images?.[0]?.uuid;
                  const price = item.price?.discounted_price || 0;
                  const quantity = item.pivot?.quantity || 0;

                  return (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 relative">
                        <Image
                          src={
                            imageUrl
                              ? getImageUrl(imageUrl)
                              : "/placeholder.svg"
                          }
                          alt={product.title || "Product"}
                          width={64}
                          height={64}
                          className="object-cover rounded w-16 h-16"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">
                          {product.title || "Product"}
                        </h3>
                        {item.variation_options &&
                          item.variation_options.length > 0 && (
                            <p className="text-xs text-gray-500">
                              {item.variation_options
                                .map((opt) => opt.value)
                                .join(", ")}
                            </p>
                          )}
                        <p className="text-sm text-gray-500">Qty: {quantity}</p>
                      </div>
                      <p className="font-medium">
                        {item.price?.currency || currency} {price.toFixed(2)}
                      </p>
                    </div>
                  );
                })}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rs {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shippingCost > 0
                        ? `${currency} ${shippingCost.toFixed(2)}`
                        : "Free"}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>Rs {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
