"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const BuyNowButton = ({ currentItem, productData, className = "" }) => {
    const { addToCart } = useCart();
    const { userData } = useAuth();
    const router = useRouter();

    const handleBuyNow = () => {
        if (currentItem) {
            addToCart({
                ...currentItem,
                product: productData,
            });
            router.push(userData ? '/checkout' : '');
        }
    };

    return (
        <button
            onClick={handleBuyNow}
            className={`w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition ${className}`}
        >
            Buy now
        </button>
    );
};

export default BuyNowButton;

