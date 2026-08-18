"use client";
import { formatMoney } from "@/app/utils/utils";
import CartLineItem from "@/components/cart/CartLineItem";

export default function CheckoutOrderSummary({
  cartItems,
  subtotal,
  shippingCost,
  total,
  isShippingLoading,
}) {
  return (
    <div className="lg:w-2/5">
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
        <p className="text-2xl md:text-2xl text-gray-500 mb-6">
          Order{" "}
          <span className="font-semibold text-primary"> Summary</span>
        </p>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartLineItem key={item.id} item={item} />
          ))}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatMoney(subtotal, 2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {isShippingLoading ? (
                  <span className="inline-block h-4 w-20 rounded bg-gray-200 animate-pulse" />
                ) : shippingCost > 0 ? (
                  formatMoney(shippingCost, 2)
                ) : (
                  "Free"
                )}
              </span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>
                {isShippingLoading ? (
                  <span className="inline-block h-5 w-24 rounded bg-gray-200 animate-pulse" />
                ) : (
                  formatMoney(total, 2)
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

