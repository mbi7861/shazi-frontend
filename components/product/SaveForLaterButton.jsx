"use client";

import React from "react";
import { useSavedItem } from "@/hooks/useSavedItem";
import { HeartIcon, HeartFilledIcon } from '@/assets/assets';

const SaveForLaterButton = ({ currentItem, productData, className = "" }) => {
    const { isSaved, toggle } = useSavedItem(currentItem, productData);

    return (
        <button
            onClick={toggle}
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