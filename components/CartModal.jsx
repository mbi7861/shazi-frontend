'use client';
import React, {useEffect, useRef} from 'react';
import Image from 'next/image';
import { getImageUrl } from "@/app/utils/utils";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";

const CartModal = ({ isOpen, onClose }) => {
    const { router, cartItems, updateCartQuantity, removeFromCart,cartAmount } = useAppContext();
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
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end" ref={modalRef}>
            <div className="bg-white w-full sm:w-[90vw] md:w-[440px] h-full shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-3 border-b">
                    <h2 className="text-xl font-bold">Cart</h2>
                    <button onClick={onClose} className="text-2xl font-bold text-gray-600 hover:text-black">&times;</button>
                </div>

                {/* Product List */}
                <div className="flex-1 overflow-y-auto p-4">
                    {Object.values(cartItems).map((product) => {
                        const quantity = product.pivot?.quantity || 0;
                        const price = product.prices?.[0]?.discounted_price || 0;
                        const subtotal = quantity * price;
                        const imageUrl = product.primary_image || product.images?.[0]?.uuid;

                        return (
                            <div key={product.id} className="border-b pb-4 mb-4">
                                <div className="flex gap-4">
                                    <Image
                                        src={getImageUrl(imageUrl)}
                                        alt={product.title}
                                        className="w-20 h-20 object-cover rounded"
                                        width={80}
                                        height={80}
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-base text-gray-800">{product.title}</h3>
                                        <p className=" flex justify-between text-sm text-gray-500 "><span>Rs {price} </span> <span className="ml-2">(Sub Total: Rs {subtotal})</span></p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <button onClick={() => updateCartQuantity(product.id, quantity - 1)}>
                                                <Image src={assets.decrease_arrow} alt="decrease" className="w-4 h-4" />
                                            </button>
                                            <span className="text-md">{quantity}</span>
                                            <button onClick={() => updateCartQuantity(product.id, quantity + 1)}>
                                                <Image src={assets.increase_arrow} alt="increase" className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => removeFromCart(product.id)}
                                                className="ml-auto text-sm text-gray-600 hover:text-red-600"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="border-t px-4 py-3">
                    <div className="flex justify-between text-lg font-semibold mb-3">
                        <span>Total</span>
                        <span>Rs {cartAmount.toLocaleString()}</span>
                    </div>
                    <button
                        onClick={() => router.push('/cart')}
                        className="w-full bg-[#ea580c] hover:bg-[#001A33] text-white font-semibold py-2 rounded"
                    >
                        Proceed to Cart
                    </button>
                    <button
                        onClick={onClose}
                        className="mt-2 w-full text-sm text-gray-600 underline hover:text-gray-800"
                    >
                        Continue shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartModal;
