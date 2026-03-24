"use client";
import Image from "next/image";
import { getImageUrl } from "@/app/utils/utils";

export default function CheckoutOrderSummary({
  cartItems,
  subtotal,
  shippingCost,
  total,
  currency,
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
          {cartItems.map((item) => {
            const product = item.product || {};
            const imageUrl =
              item.primary_image ||
              product.images?.find((img) => img.is_preview)?.uuid ||
              product.images?.[0]?.uuid;
            const price = item.price?.discounted_price || 0;
            const quantity = item.quantity || 0;

            return (
              <div key={item.id} className="flex items-center gap-4">
                <div className="w-16 h-16 relative">
                  <Image
                    src={
                      imageUrl ? getImageUrl(imageUrl) : "/placeholder.svg"
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
                {isShippingLoading ? (
                  <span className="inline-block h-4 w-20 rounded bg-gray-200 animate-pulse" />
                ) : shippingCost > 0 ? (
                  `${currency} ${shippingCost.toFixed(2)}`
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
                  `Rs ${total.toFixed(2)}`
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

