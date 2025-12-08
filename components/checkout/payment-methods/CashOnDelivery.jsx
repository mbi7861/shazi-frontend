"use client";

export default function CashOnDelivery({ isSelected, onSelect }) {
  return (
    <div className="border rounded p-4">
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          id="cod"
          name="paymentMethod"
          value="cod"
          checked={isSelected}
          onChange={(e) => onSelect(e.target.value)}
        />
        <label htmlFor="cod" className="font-medium">
          Cash on Delivery (COD)
        </label>
      </div>
    </div>
  );
}

