'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { assets, HeartIcon, HeartFilledIcon } from '@/assets/assets';
import { apiServiceConfig } from '@/app/config/apiService';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
const stripHtmlTags = (html) => {
    if (!html) return '';
    if (typeof window === 'undefined') return html.replace(/<[^>]*>/g, '').trim();
    return html;
};

const ProductCard = ({ product }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY || 'Rs';
    const [hovered, setHovered] = useState(false);
    const { saveItemForLater, removeFromSaved, savedItems } = useCart();

    const defaultItem =
        product.product_items?.find(item => item.is_default) ||
        product.product_items?.[0];

    const isSaved = savedItems.some((p) => p.id === defaultItem?.id);

    const handleToggleSave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!defaultItem) return;
        if (isSaved) {
            removeFromSaved(defaultItem.id);
        } else {
            saveItemForLater({ ...defaultItem, product });
        }
    };

    const price = defaultItem?.price?.discounted_price || 0;
    const originalPrice = defaultItem?.price?.price;
    const hasDiscount = defaultItem?.price?.discount_value !== null;

    const imageUUID =
        product.primary_image ||
        product.images?.find(img => img.is_preview)?.uuid ||
        product.images?.[0]?.uuid;

    const imageUrl = imageUUID
        ? `${apiServiceConfig.imageBaseUrl}/products/${imageUUID}`
        : '';

    return (
        <Link
            href={`/product/${product.slug}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group cursor-pointer block"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] bg-[#F9F9F9] overflow-hidden mb-6">
                <Image
                    src={imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                />

                {/* Wishlist Button */}
                <button
                    aria-label="Toggle Save for Later"
                    onClick={handleToggleSave}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    {isSaved ? <HeartFilledIcon /> : <HeartIcon />}
                </button>

                {/* Discount Badge */}
                {hasDiscount && (
                    <div className="absolute top-3 left-3 bg-black text-white text-[10px] uppercase tracking-widest px-2 py-1">
                        Sale
                    </div>
                )}

                {/* View Details Overlay Button */}
                <div className="absolute inset-x-0 bottom-6 flex justify-center px-4">
                    <button className="bg-white text-black px-6 py-3 text-xs uppercase tracking-widest font-medium shadow-sm hover:bg-black hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                        View Details
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="text-center">
                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Image
                            key={index}
                            className="h-2.5 w-2.5"
                            src={index < Math.floor(4.5) ? assets.star_icon : assets.star_dull_icon}
                            alt="star"
                        />
                    ))}
                    <span className="text-[10px] text-gray-400 ml-1">4.5</span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl mb-1 truncate px-2">
                    {product.title}
                </h3>

                {/* Price */}
                <p className="text-gray-500 text-sm tracking-wide">
                    {currency} {price}
                    {hasDiscount && (
                        <span className="line-through text-gray-300 ml-2">
                            {currency} {originalPrice}
                        </span>
                    )}
                </p>
            </div>
        </Link>
    );
};

export default ProductCard;