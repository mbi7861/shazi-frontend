"use client";

import React from "react";
import { formatMoney } from "@/app/utils/utils";

const ProductPrice = ({ price, originalPrice, hasDiscount }) => {
    return (
        <p className="text-3xl font-medium mt-6">
            {formatMoney(price)}
            {hasDiscount && (
                <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                    {formatMoney(originalPrice)}
                </span>
            )}
        </p>
    );
};

export default ProductPrice;




