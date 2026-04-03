"use client";

import React from "react";

const ProductPrice = ({ price, originalPrice, hasDiscount }) => {
    return (
        <p className="text-3xl font-medium mt-6 text-shazi-gold">
            Rs {price}
            {hasDiscount && (
                <span className="text-base font-normal text-white line-through ml-2">
                    Rs {originalPrice}
                </span>
            )}
        </p>
    );
};

export default ProductPrice;




