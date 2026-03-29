'use client';

import React from "react";
import Link from 'next/link';
import Image from "next/image";
import { assets } from "@/assets/assets";
import { getImageUrl } from "@/app/utils/utils";

const CategoryGrid = ({ categories }) => {

    if (!categories || categories.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No categories available at the moment.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categories.map((category, index) => {
                const imageUrl = getImageUrl(category.image?.uuid, "categories") || assets.logo;
                
                return (
                    <Link
                        key={category.id || category.slug || index}
                        href={`/all-products?category=${category.slug}`}
                        className="group cursor-pointer block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:border-primary"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 overflow-hidden rounded-lg bg-gray-100">
                                <Image
                                    src={imageUrl}
                                    alt={category.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-base font-medium text-gray-900 group-hover:text-primary transition-colors mb-1">
                                {category.title}
                            </h3>
                            {category.products_count !== undefined && (
                                <p className="text-sm text-gray-500">
                                    {category.products_count} {category.products_count === 1 ? 'product' : 'products'}
                                </p>
                            )}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default CategoryGrid;

