"use client";

import React from "react";
import ProductCard from "@/components/ProductCard";

const RelatedProductsGrid = ({ relatedProducts }) => {
    if (!relatedProducts || relatedProducts.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center mb-4 mt-16">
                <p className="text-3xl font-medium">Related <span
                    className="font-medium text-orange-600">Products</span></p>
                <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
            </div>
            <div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
                {relatedProducts.slice(0, 5).map((product, index) => (
                    <ProductCard key={index} product={product}/>
                ))}
            </div>
        </div>
    );
};

export default RelatedProductsGrid;

