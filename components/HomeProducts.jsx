'use client';
import React from "react";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/context/ProductContext";
import Link from 'next/link';

const HomeProducts = ({ products: ssrProducts }) => {
    const { products: contextProducts } = useProducts();

    // Use SSR products if available, otherwise fall back to context
    const products = ssrProducts;

    return (


        <section className="py-12 px-4 sm:px-8 lg:px-16 max-w-screen-2xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif text-shazi-black mb-4">
                    Our Best Products
                </h2>
                <div className="w-16 h-[1px] bg-shazi-gold mx-auto" />
            </div>
            {products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.id || product.slug || index}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                <div className="w-full py-8 text-center text-gray-500">
                    No products available at the moment.
                </div>
            )}

            {/* View All Link */}
            <div className="mt-20 text-center">
                <Link
                    href="/all-products"
                    className="text-lg uppercase tracking-widest border-b border-shazi-gold pb-1 hover:text-shazi-gold transition-colors font-medium inline-block"
                >
                    Explore All
                </Link>
            </div>
        </section>
    );
};

export default HomeProducts;
