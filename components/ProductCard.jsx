'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import { useRouter } from 'next/navigation';
import { apiServiceConfig } from '@/app/config/apiService';

// Simple HTML tag stripper for server-side safety
const stripHtmlTags = (html) => {
    if (!html) return '';
    if (typeof window === 'undefined') {
        // Server-side: simple tag removal
        return html.replace(/<[^>]*>/g, '').trim();
    }
    return html;
};

const ProductCard = ({ product }) => {
    const router = useRouter();
    const currency = process.env.NEXT_PUBLIC_CURRENCY || 'Rs';
    const [sanitizedDescription, setSanitizedDescription] = useState('');

    // Sanitize description on client side only
    useEffect(() => {
        if (typeof window !== 'undefined' && product.small_description) {
            import('dompurify').then((DOMPurify) => {
                const sanitized = DOMPurify.default.sanitize(product.small_description);
                setSanitizedDescription(sanitized);
            }).catch(() => {
                // Fallback if DOMPurify fails
                setSanitizedDescription(stripHtmlTags(product.small_description));
            });
        } else {
            // Server-side fallback
            setSanitizedDescription(stripHtmlTags(product.small_description));
        }
    }, [product.small_description]);

    // ---- FIXED: Get default or first product item ----
    const defaultItem =
        product.product_items?.find(item => item.is_default) ||
        product.product_items?.[0];

    // ---- FIXED: Ensure price exists ----
    const price = defaultItem?.price?.discounted_price || 0;
    const originalPrice = defaultItem?.price?.price;
    const hasDiscount = defaultItem?.price?.discount_value !== null;

    // ---- FIXED: Handle images like payload ----
    const imageUUID =
        product.primary_image ||
        product.images?.find(img => img.is_preview)?.uuid ||
        product.images?.[0]?.uuid;

    const imageUrl = imageUUID
        ? `${apiServiceConfig.imageBaseUrl}/products/${imageUUID}`
        : '';

    return (
        <div
            onClick={() => {
                router.push('/product/' + product.slug);
                scrollTo(0, 0);
            }}
            className="flex flex-col items-start gap-0.5 w-full cursor-pointer"
        >
            <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
                <Image
                    src={imageUrl}
                    alt={product.title}
                    className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
                    width={800}
                    height={800}
                    loading={'eager'}
                />
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                    <Image
                        className="h-3 w-3"
                        src={assets.heart_icon}
                        alt="heart_icon"
                    />
                </button>
            </div>

            <p className="md:text-base font-medium pt-2 w-full truncate">
                {product.title}
            </p>
{/* 
            {sanitizedDescription && (
                <div
                    className="w-full text-xs text-gray-500/70 max-sm:hidden truncate"
                    dangerouslySetInnerHTML={{
                        __html: sanitizedDescription,
                    }}
                />
            )} */}

            <div className="flex items-center gap-2">
                <p className="text-xs">{4.5}</p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Image
                            key={index}
                            className="h-3 w-3"
                            src={
                                index < Math.floor(4.5)
                                    ? assets.star_icon
                                    : assets.star_dull_icon
                            }
                            alt="star_icon"
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-medium">
                    {currency} {price}
                    {hasDiscount && (
                        <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                            {currency} {originalPrice}
                        </span>
                    )}
                </p>

                <button className="max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
                    Buy now
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
