"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { HeartIcon, HeartFilledIcon } from '@/assets/assets';

const SaveForLaterButton = ({ currentItem, productData, className = "" }) => {
    const { saveItemForLater, removeFromSaved, savedItems } = useCart();

    const isSaved = savedItems.some((p) => p.id === currentItem?.id);

    const handleToggle = () => {
        if (!currentItem) return;
        if (isSaved) {
            removeFromSaved(currentItem.id);
        } else {
            saveItemForLater({ ...currentItem, product: productData });
        }
    };

    return (
        <button
            onClick={handleToggle}
            aria-label={isSaved ? "Remove from saved items" : "Save for later"}
            aria-pressed={isSaved} 
            className={`w-auto px-3 py-3.5 border border-gray-300 text-sm text-gray-600 hover:border-primary hover:text-primary transition ${className}`}
        >
            {isSaved
                ? <HeartFilledIcon className="w-5 h-5" aria-hidden="true" />
                : <HeartIcon className="w-5 h-5" aria-hidden="true" />
            }
        </button>
    );
};

export default SaveForLaterButton;