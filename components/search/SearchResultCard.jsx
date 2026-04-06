"use client";

import Image from "next/image";
import Link from "next/link";
import { apiServiceConfig } from "@/app/config/apiService";

/**
 * SearchResultCard — Compact horizontal product card for search results.
 * Shows product image, title, and price in a clean row layout.
 */
const SearchResultCard = ({ product, onClose }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "Rs";

  const defaultItem =
    product.product_items?.find((item) => item.is_default) ||
    product.product_items?.[0];

  const price = defaultItem?.price?.discounted_price || 0;
  const originalPrice = defaultItem?.price?.price;
  const hasDiscount = defaultItem?.price?.discount_value !== null;

  const imageUUID =
    product.primary_image ||
    product.images?.find((img) => img.is_preview)?.uuid ||
    product.images?.[0]?.uuid;

  const imageUrl = imageUUID
    ? `${apiServiceConfig.imageBaseUrl}/products/${imageUUID}`
    : "";

  return (
    <Link
      href={`/product/${product.slug}`}
      onClick={onClose}
      className="search-result-card"
    >
      {/* Image */}
      <div className="search-result-card-image">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="search-result-card-placeholder" />
        )}
        {hasDiscount && <span className="search-result-card-badge">Sale</span>}
      </div>

      {/* Info */}
      <div className="search-result-card-info">
        <h4 className="search-result-card-title">{product.title}</h4>
        <p className="search-result-card-price">
          {currency} {price}
          {hasDiscount && (
            <span className="search-result-card-original-price">
              {currency} {originalPrice}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default SearchResultCard;
