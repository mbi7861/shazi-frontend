"use client";
import React from "react";
import Slider from 'react-slick';
import { useProducts } from "@/context/ProductContext";
import { useRouter } from "next/navigation";
import {getImageUrl} from "@/app/utils/utils";
import Image from "next/image";

const CategoryHome = ({ categories}) => {
    const { categories: contextCategories } = useProducts();
    const router = useRouter();
    
    // Use SSR categories if available, otherwise fall back to context
    const settings = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };
    return (
        <div className="w-full py-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-medium text-left ">Shop by Categories</h3>
                <a
                    onClick={() => router.push('/categories')}
                    className="text-sm border-b border-[#eb492f] text-gray-800 hover:text-[#eb492f] cursor-pointer"
                >
                    View all
                </a>
            </div>

            <Slider {...settings}>
                {categories.map((cat, idx) => (
                    <div key={idx} className="px-2">
                        <div className="text-center">
                            <div 
                                onClick={() => router.push(`/all-products?category=${cat.slug}`)} 
                                title={cat.title}
                                className="cursor-pointer"
                            >

                                <Image
                                    src={getImageUrl(cat.image?.uuid, "categories")}
                                    alt={cat.title}
                                    width={180}
                                    height={180}
                                    className="mx-auto max-h-40 object-cover aspect-square rounded-lg hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <a
                                onClick={() => router.push(`/all-products?category=${cat.slug}`)}
                                className="block mt-2 text-sm font-medium text-black hover:text-orange-600 cursor-pointer transition-colors"
                            >
                                {cat.title}
                            </a>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );

};

export default CategoryHome;
