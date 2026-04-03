"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const BuyNowButton = ({ currentItem, productData, className = "" }) => {
    const { addToCart } = useCart();
    const router = useRouter();

    const handleBuyNow = () => {
        if (currentItem) {
            addToCart({
                ...currentItem,
                product: productData,
            });
            router.push('/checkout');
        }
    };

    return (
        <button
            onClick={handleBuyNow}
            className={`w-full py-3.5 bg-shazi-gold text-black hover:bg-shazi-gold/80 transition ${className}`}
        >
            Buy now
        </button>
    );
};

export default BuyNowButton;




