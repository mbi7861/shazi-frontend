import { useCart } from "@/context/CartContext";
import React from "react";
import Link from 'next/link';

const OrderSummary = () => {
  const { cartCount, cartAmount } = useCart();
  const currency = process.env.NEXT_PUBLIC_CURRENCY || 'Rs';

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">
        Order Summary
      </h2>
      <hr className="border-gray-500/30 my-5" />
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">Items {cartCount}</p>
            <p className="text-gray-800">{currency}{cartAmount}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-gray-800">Free</p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Total</p>
            <p>{currency}{cartAmount}</p>
          </div>
        </div>
      </div>

      <Link href="/checkout" className="w-full bg-primary text-white py-3 mt-5 hover:bg-primary/80 block text-center cursor-pointer">
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default OrderSummary;