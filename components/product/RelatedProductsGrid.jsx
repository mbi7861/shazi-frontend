"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { productService } from '@/services';

const RelatedProductsGrid = ({ slug }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        productService.fetchRelatedProducts(slug)
            .then((products) => {
                console.log(products);

                if (products) setRelatedProducts(products.data.slice(0, 5));
            })
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return (
            <div className="flex flex-col items-center mt-16 pb-14">
                <div className="flex flex-col items-center mb-4">
                    <p className="text-3xl font-medium">
                        Related <span className="font-medium text-shazi-gold">Products</span>
                    </p>
                    <div className="w-28 h-0.5 bg-shazi-gold mt-2"></div>
                </div>
                {/* Skeleton placeholders */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 w-full">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-md" />
                    ))}
                </div>
            </div>
        );
    }

    if (!relatedProducts.length) return null;

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center mb-4 mt-16">
                <p className="text-3xl font-medium">
                    Related <span className="font-medium text-shazi-gold">Products</span>
                </p>
                <div className="w-28 h-0.5 bg-shazi-gold mt-2"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
                {relatedProducts.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default RelatedProductsGrid;