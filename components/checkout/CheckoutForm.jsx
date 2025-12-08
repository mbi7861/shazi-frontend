"use client";
import AddressList from "@/components/AddressList";
import CashOnDelivery from "./payment-methods/CashOnDelivery";
import BankDeposit from "./payment-methods/BankDeposit";
import CardPayment from "./payment-methods/CardPayment";

export default function CheckoutForm({
  formData,
  errors,
  isLoading,
  onInputChange,
  onSubmit,
  stripePromise,
  stripeRef,
  onAddressSelect,
}) {
  return (
    <div className="lg:w-3/5">
      <div className="bg-white rounded shadow-md p-6">
        <p className="text-2xl md:text-3xl text-gray-500 mb-6">
          Shipping{" "}
          <span className="font-semibold text-orange-600"> Address</span>
        </p>
        <form onSubmit={onSubmit} className="space-y-3">
          <AddressList
            onSelect={(selectedAddress) => {
              onAddressSelect(selectedAddress);
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
              <CashOnDelivery
                isSelected={formData.paymentMethod === "cod"}
                onSelect={(value) => onInputChange("paymentMethod", value)}
              />

              <BankDeposit
                isSelected={formData.paymentMethod === "bank"}
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
            className="w-full bg-orange-600 text-white py-5 mt-5 hover:bg-orange-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2 justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Processing...
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

