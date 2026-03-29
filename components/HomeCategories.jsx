"use client";
import React from "react";
import Slider from 'react-slick';
import { useRouter } from "next/navigation";
import {getImageUrl} from "@/app/utils/utils";
import Image from "next/image";import Link from 'next/link';

const CategoryHome = ({ categories }) => {

    // Triple the slides so slick's wrap point is in the middle of identical content (reduces visible break)
    const slides = [...categories, ...categories, ...categories];

    const settings = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        speed: 700,
        cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
        waitForAnimate: false,
        useTransform: true,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: Math.min(3, categories.length) },
            },
            {
                breakpoint: 640,
                settings: { slidesToShow: Math.min(2, categories.length) },
            },
        ],
    };
    return (
        <div className="home-categories-slider w-full py-8 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-medium text-left ">Shop by Categories</h3>
                <Link
                    href={'/categories'}
                    className="text-sm border-b border-[#eb492f] text-gray-800 hover:text-[#eb492f] cursor-pointer"
                >
                    View all
                </Link>
            </div>

            <Slider {...settings}>
                {slides.map((cat, idx) => (
                    <div key={`${cat.slug}-${idx}`} className="px-2">
                        <div className="text-center">
                            <Link
                                href={`/all-products?category=${cat.slug}`}
                                title={cat.title}
                                className="cursor-pointer block"
                            >
                                <Image
                                    src={getImageUrl(cat.image?.uuid, "categories")}
                                    alt={cat.title}
                                    width={180}
                                    height={180}
                                    className="mx-auto max-h-40 object-cover aspect-square rounded-lg hover:scale-105 transition-transform duration-300"
                                />
                            </Link>
                            <Link
                                href={`/all-products?category=${cat.slug}`}
                                className="block mt-2 text-sm font-medium text-black hover:text-primary cursor-pointer transition-colors"
                            >
                                {cat.title}
                            </Link>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );

};

export default CategoryHome;
