'use client';

import React, { useState } from 'react';
import { assets } from '@/assets/assets';
import OrderSummary from '@/components/OrderSummary';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { getImageUrl } from '@/app/utils/utils';
import PageHero from '@/components/PageHero';

// ─── helpers ────────────────────────────────────────────────────────────────

const getItemImage = (item) => {
  const product = item.product || {};
  return (
    product.primary_image ||
    product.images?.find((img) => img.is_preview)?.uuid ||
    product.images?.[0]?.uuid
  );
};

// ─── Cart row ────────────────────────────────────────────────────────────────

const CartRow = ({ item, onUpdateQty, onRemove, onSaveForLater }) => {
  const quantity = item.quantity || 0;
  const price = item.price?.discounted_price || 0;
  const total = price * quantity;
  const product = item.product || {};
  const imageUrl = getImageUrl(getItemImage(item));

  return (
    <tr key={item.id} className="border-b border-gray-100 last:border-0">
      {/* Product details */}
      <td className="flex items-center gap-4 py-4 md:px-4 px-1">
        <div>
          <div className="rounded-lg overflow-hidden bg-gray-500/10 p-2">
            <Image
              src={imageUrl}
              alt={product.title || 'Product'}
              className="w-16 h-auto object-cover mix-blend-multiply"
              width={1280}
              height={720}
            />
          </div>
          {/* Mobile actions */}
          <div className="md:hidden flex gap-3 mt-1">
            <button
              className="text-xs text-red-400"
              onClick={() => onRemove(item.id)}
            >
              Remove
            </button>
            <button
              className="text-xs text-shazi-gold"
              onClick={() => onSaveForLater(item.id)}
            >
              Save for later
            </button>
          </div>
        </div>

        {/* Desktop name + actions */}
        <div className="text-sm hidden md:block">
          <p className=" font-medium">{product.title || 'Product'}</p>
          {item.variation_options?.length > 0 && (
            <p className="text-xs mt-0.5">
              {item.variation_options.map((opt) => opt.value).join(', ')}
            </p>
          )}
          <div className="flex gap-4 mt-1">
            <button
              className="text-xs text-red-400 hover:text-red-600 transition-colors"
              onClick={() => onRemove(item.id)}
            >
              Remove
            </button>
            <button
              className="text-xs text-shazi-gold hover:underline transition-colors"
              onClick={() => onSaveForLater(item.id)}
            >
              Save for later
            </button>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="py-4 md:px-4 px-1 ">Rs {price}</td>

      {/* Quantity */}
      <td className="py-4 md:px-4 px-1">
        <div className="flex items-center md:gap-2 gap-1">
          <button onClick={() => onUpdateQty(item.id, quantity - 1)}>
            <Image src={assets.decrease_arrow} alt="decrease" className="w-4 h-4" />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => onUpdateQty(item.id, Number(e.target.value))}
            className="w-8 text-center bg-transparent"
          />
          <button onClick={() => onUpdateQty(item.id, quantity + 1)}>
            <Image src={assets.increase_arrow} alt="increase" className="w-4 h-4" />
          </button>
        </div>
      </td>

      {/* Subtotal */}
      <td className="py-4 md:px-4 px-1">Rs {total}</td>
    </tr>
  );
};

// ─── Saved-for-later row ─────────────────────────────────────────────────────

const SavedRow = ({ item, onMoveToCart, onRemove }) => {
  const price = item.price?.discounted_price || 0;
  const product = item.product || {};
  const imageUrl = getImageUrl(getItemImage(item));

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
      <div className="rounded-lg overflow-hidden bg-gray-500/10 p-2 shrink-0">
        <Image
          src={imageUrl}
          alt={product.title || 'Product'}
          className="w-16 h-auto object-cover mix-blend-multiply"
          width={1280}
          height={720}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-gray-800 font-medium text-sm truncate">
          {product.title || 'Product'}
        </p>
        {item.variation_options?.length > 0 && (
          <p className="text-xs text-gray-500 mt-0.5">
            {item.variation_options.map((opt) => opt.value).join(', ')}
          </p>
        )}
        <p className="text-sm text-gray-600 mt-0.5">Rs {price}</p>
        <div className="flex gap-4 mt-1">
          <button
            className="text-xs text-shazi-gold hover:underline transition-colors"
            onClick={() => onMoveToCart(item.id)}
          >
            Move to cart
          </button>
          <button
            className="text-xs text-red-400 hover:text-red-600 transition-colors"
            onClick={() => onRemove(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Page ────────────────────────────────────────────────────────────────────

const Cart = () => {
  const {
    cartItems,
    cartCount,
    updateCartQuantity,
    removeFromCart,
    savedItems,
    saveForLater,
    removeFromSaved,
    moveToCart,
  } = useCart();

  return (
    <>
      <Navbar />
      <PageHero title="Cart" />

      <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-24 mb-20">
        <div className="flex-1">
          {/* ── Cart header ── */}
          <div className="flex items-center justify-between mb-8 border-b border-gray-500/30 pb-6">
            <p className="text-2xl md:text-3xl ">
              Your <span className="font-medium text-shazi-gold">Cart</span>
            </p>
            <p className="text-lg md:text-xl">{cartCount} Items</p>
          </div>

          {/* ── Cart table ── */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="text-left">
                <tr>
                  <th className="text-nowrap pb-6 md:px-4 px-1 font-medium">
                    Product Details
                  </th>
                  <th className="pb-6 md:px-4 px-1 font-medium">Price</th>
                  <th className="pb-6 md:px-4 px-1 font-medium">Quantity</th>
                  <th className="pb-6 md:px-4 px-1 font-medium">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <CartRow
                    key={item.id}
                    item={item}
                    onUpdateQty={updateCartQuantity}
                    onRemove={removeFromCart}
                    onSaveForLater={saveForLater}
                  />
                ))}
              </tbody>
            </table>

            {cartItems.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-8">Your cart is empty.</p>
            )}
          </div>

          {/* ── Continue shopping ── */}
          <Link
            href={'/all-products'}
            className="group flex items-center mt-6 gap-2 text-shazi-gold w-max cursor-pointer"
          >
            <Image
              className="group-hover:-translate-x-1 transition"
              src={assets.arrow_right_icon_colored}
              alt="arrow_right_icon_colored"
            />
            Continue Shopping
          </Link>

          {/* ── Saved for later section ── */}
          {savedItems.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6 border-b border-gray-500/30 pb-4">
                <p className="text-xl md:text-2xl text-gray-500">
                  Saved for{' '}
                  <span className="font-medium text-shazi-gold">Later</span>
                </p>
                <p className="text-sm text-gray-500/80">{savedItems.length} Item{savedItems.length !== 1 ? 's' : ''}</p>
              </div>

              <div>
                {savedItems.map((item) => (
                  <SavedRow
                    key={item.id}
                    item={item}
                    onMoveToCart={moveToCart}
                    onRemove={removeFromSaved}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <OrderSummary />
      </div>
    </>
  );
};

export default Cart;
