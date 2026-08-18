"use client";

import Image from "next/image";
import Link from "next/link";
import { getImageUrl, resolveImageUUID, formatMoney } from "@/app/utils/utils";
import { getDefaultProductItem } from "@/lib/product/getDefaultProductItem";
import { getProductPricing } from "@/lib/product/getProductPricing";

/**
 * SearchResultCard — Compact horizontal product card for search results.
 * Shows product image, title, and price in a clean row layout.
 */
const SearchResultCard = ({ product, onClose }) => {
  const defaultItem = getDefaultProductItem(product.product_items);

  const { price, originalPrice, hasDiscount } = getProductPricing(defaultItem);

  const imageUUID = resolveImageUUID(product.primary_image, product.images);
  const imageUrl = getImageUrl(imageUUID);

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
          {formatMoney(price)}
          {hasDiscount && (
            <span className="search-result-card-original-price">
              {formatMoney(originalPrice)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default SearchResultCard;
