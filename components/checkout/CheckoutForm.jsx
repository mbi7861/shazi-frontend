"use client";
import AddressList from "@/components/AddressList";
import CashOnDelivery from "./payment-methods/CashOnDelivery";
import CardPayment from "./payment-methods/CardPayment";

export default function CheckoutForm({
  formData,
  errors,
  isLoading,
  isShippingLoading,
  onInputChange,
  onSubmit,
  stripePromise,
  stripeRef,
  onAddressSelect,
  userData,
}) {
  const isLoggedIn = !!userData;

  return (
    <div className="lg:w-3/5">
      <div className="bg-white rounded shadow-md p-6">
        <p className="text-2xl md:text-3xl text-gray-500 mb-6">
          Shipping{" "}
          <span className="font-semibold text-primary"> Address</span>
        </p>
        <form onSubmit={onSubmit} className="space-y-3">
          {/* Email Input */}
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => onInputChange("email", e.target.value)}
              disabled={isLoggedIn}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.email ? "border-red-500" : "border-gray-300"
                } ${isLoggedIn ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <AddressList
            prevAddressId={formData.address_id ?? null}
            onSelect={(selectedAddress) => {
              onAddressSelect(selectedAddress);
            }}
          />
          {errors.address_id && (
            <p className="mt-1 text-sm text-red-500">{errors.address_id}</p>
          )}

          {/* Payment Method */}
          <div className="space-y-4">
            <p className="text-2xl md:text-3xl text-gray-500 my-6">
              Payment{" "}
              <span className="font-semibold text-primary">
                {" "}
                Method
              </span>
            </p>
            <p className="text-sm text-gray-600">
              All transactions are secure and encrypted.
            </p>
            <div className="space-y-4">

              <CashOnDelivery
                isSelected={formData.paymentMethod === "cod"}
                onSelect={(value) => onInputChange("paymentMethod", value)}
              />

              <CardPayment
                isSelected={formData.paymentMethod === "card"}
                onSelect={(value) => onInputChange("paymentMethod", value)}
                stripePromise={stripePromise}
                stripeRef={stripeRef}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-5 mt-5 hover:bg-primary/80"
            disabled={isLoading || isShippingLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2 justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Processing...
              </span>
            ) : isShippingLoading ? (
              <span className="flex items-center gap-2 justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Calculating shipping...
              </span>
            ) : (
              "Complete order"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

