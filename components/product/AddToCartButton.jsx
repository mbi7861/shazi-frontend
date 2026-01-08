"use client";

import React from "react";
import { useCart } from "@/context/CartContext";

const AddToCartButton = ({ currentItem, productData, className = "" }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        if (currentItem) {
            addToCart({
                ...currentItem,
                product: productData,
            });
        }
    };

    return (
        <button
            onClick={handleAddToCart}
            className={`w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition ${className}`}
        >
            Add to Cart
        </button>
    );
};

export default AddToCartButton;




