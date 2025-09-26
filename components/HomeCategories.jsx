"use client";
import React from "react";
import Slider from 'react-slick';
import Image from "next/image";
import { useProducts } from "@/context/ProductContext";
import { useRouter } from "next/navigation";
import {assets} from "@/assets/assets";
import {getImageUrl} from "@/app/utils/utils";

const CategoryHome = () => {
    const { categories } = useProducts();
    const router = useRouter();
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
                    href="/collections/all"
                    className="text-sm border-b border-[#eb492f] text-gray-800 hover:text-[#eb492f]"
                >
                    View all
                </a>
            </div>

            <Slider {...settings}>
                {categories.map((cat, idx) => (
                    <div key={idx} className="px-2">
                        <div className="text-center">
                            <a onClick={() => router.push(`/category/${cat.slug}`)} title={cat.title}>
                                <img
                                    src={getImageUrl(cat.image?.uuid, "categories") || assets.logo}

                                    alt={cat.title}
                                    className="mx-auto max-h-40 object-cover aspect-square rounded-lg hover:scale-105 transition-transform duration-300"
                                />
                            </a>
                            <a
                                href={cat.link}
                                className="block mt-2 text-sm font-medium text-black hover:text-blue-500"
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
