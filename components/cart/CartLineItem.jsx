'use client';

import Image from 'next/image';
import { assets } from '@/assets/assets';
import { getImageUrl, resolveImageUUID, formatMoney } from '@/app/utils/utils';

/**
 * A single cart line item row, shared between CartModal (editable) and
 * CheckoutOrderSummary (read-only). Pass `editable` + `onUpdateQuantity`/
 * `onRemove` for the interactive cart row; omit them for a compact
 * read-only summary row.
 */
export default function CartLineItem({ item, editable = false, onUpdateQuantity, onRemove }) {
    const quantity = item.quantity || 0;
    const price = item.price?.discounted_price || 0;
    const product = item.product || {};
    const imageUUID = resolveImageUUID(item.primary_image, product.images);
    const imageUrl = getImageUrl(imageUUID) || '/placeholder.svg';
    const hasVariants = item.variation_options && item.variation_options.length > 0;

    if (!editable) {
        return (
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 relative">
                    <Image
                        src={imageUrl}
                        alt={product.title || 'Product'}
                        width={64}
                        height={64}
                        className="object-cover rounded w-16 h-16"
                    />
                </div>
                <div className="flex-1">
                    <h3 className="font-medium">{product.title || 'Product'}</h3>
                    {hasVariants && (
                        <p className="text-xs text-gray-500">
                            {item.variation_options.map((opt) => opt.value).join(', ')}
                        </p>
                    )}
                    <p className="text-sm text-gray-500">Qty: {quantity}</p>
                </div>
                <p className="font-medium">{formatMoney(price, 2)}</p>
            </div>
        );
    }

    const subtotal = quantity * price;

    return (
        <div className="border-b pb-4 mb-4">
            <div className="flex gap-4">
                <Image
                    src={imageUrl}
                    alt={product.title || 'Product'}
                    className="w-20 h-20 object-cover rounded"
                    width={80}
                    height={80}
                />
                <div className="flex-1">
                    <h3 className="font-semibold text-base text-gray-800">{product.title || 'Product'}</h3>
                    {hasVariants && (
                        <p className="text-xs text-gray-500 mt-1">
                            {item.variation_options.map((opt) => opt.value).join(', ')}
                        </p>
                    )}
                    <p className="flex justify-between text-sm text-gray-500">
                        <span>{formatMoney(price)} </span>
                        <span className="ml-2">(Sub Total: {formatMoney(subtotal)})</span>
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => onUpdateQuantity(quantity - 1)}>
                            <Image src={assets.decrease_arrow} alt="decrease" className="w-4 h-4" />
                        </button>
                        <span className="text-md">{quantity}</span>
                        <button onClick={() => onUpdateQuantity(quantity + 1)}>
                            <Image src={assets.increase_arrow} alt="increase" className="w-4 h-4" />
                        </button>
                        <button onClick={onRemove} className="ml-auto text-sm text-gray-600 hover:text-red-600">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
