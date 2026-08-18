'use client';
import React, {useEffect, useRef} from 'react';
import { formatMoney } from "@/app/utils/utils";
import { useCart } from "@/context/CartContext";
import { cartService } from "@/services";
import CartLineItem from "@/components/cart/CartLineItem";
import Link from "next/link";

const CartModal = ({ isOpen, onClose }) => {
    const { cartItems, updateCartQuantity, removeFromCart, cartAmount } = useCart();
    const modalRef = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
            <div ref={modalRef} className="bg-white w-full sm:w-[90vw] md:w-[440px] h-full shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-3 border-b">
                    <h2 className="text-xl font-bold">Cart</h2>
                    <button onClick={onClose} className="text-2xl font-bold text-gray-600 hover:text-black">&times;</button>
                </div>

                {/* Product List */}
                <div className="flex-1 overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        cartItems.map((item) => {
                            const itemKey = cartService.getItemKey(item);
                            return (
                                <CartLineItem
                                    key={itemKey}
                                    item={item}
                                    editable
                                    onUpdateQuantity={(qty) => updateCartQuantity(itemKey, qty)}
                                    onRemove={() => removeFromCart(itemKey)}
                                />
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                <div className="border-t px-4 py-3">
                    <div className="flex justify-between text-lg font-semibold mb-3">
                        <span>Total</span>
                        <span>{formatMoney(cartAmount)}</span>
                    </div>
                    <Link
                        href="/checkout"
                        onClick={onClose}
                        className="w-full bg-primary hover:bg-[#001A33] text-white font-semibold py-2 rounded block text-center cursor-pointer"
                    >
                        Go to Checkout
                    </Link>
                    <Link
                        href="/cart"
                        onClick={onClose}
                        className="mt-2 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded block text-center cursor-pointer"
                    >
                        View Cart
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartModal;
