"use client";
import { Elements } from "@stripe/react-stripe-js";
import StripeCardForm from "@/components/StripeCardForm";

export default function CardPayment({
  isSelected,
  onSelect,
  stripePromise,
  stripeRef,
}) {
  return (
    <div className="border rounded p-4 bg-transparent border-green-200">
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          id="card"
          name="paymentMethod"
          value="card"
          disabled={true}
          checked={isSelected}
          onChange={(e) => onSelect(e.target.value)}
        />
        <label htmlFor="card" className="font-medium">
          Pay with Card (Coming Soon)
        </label>
      </div>

      {isSelected && (
        <div className="mt-4">
          <Elements stripe={stripePromise}>
            <StripeCardForm ref={stripeRef} />
          </Elements>
        </div>
      )}
    </div>
  );
}

