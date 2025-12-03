'use client';
import React from "react";
import ProductCard from "./ProductCard";
import { useProducts } from "@/context/ProductContext";
import { useRouter } from "next/navigation";

const HomeProducts = ({ products: ssrProducts }) => {
    const { products: contextProducts } = useProducts();
    const router = useRouter();
    
    // Use SSR products if available, otherwise fall back to context
    const products = ssrProducts && ssrProducts.length > 0 ? ssrProducts : contextProducts;
    
    return (
        <div className="flex flex-col items-center pt-14">
            <div className="flex items-center justify-between mb-4 w-full">
                <h2 className="text-2xl font-medium text-left">Popular products</h2>
                <a
                    onClick={() => { router.push('/all-products') }}
                    className="text-sm border-b border-[#eb492f] text-gray-800 hover:text-[#eb492f] cursor-pointer"
                >
                    View all
                </a>
            </div>
            {products && products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
                    {products.map((product, index) => (
                        <ProductCard key={product.id || product.slug || index} product={product} />
                    ))}
                </div>
            ) : (
                <div className="w-full py-8 text-center text-gray-500">
                    No products available at the moment.
                </div>
            )}
        </div>
    );
};

export default HomeProducts;
