"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import { getImageUrl } from "@/app/utils/utils";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

const ProductClient = ({ initialProduct , relatedProducts }) => {
    const { addToCart } = useCart();
    const { userData } = useAuth();
    console.log(userData);
    const router = useRouter();
    const [mainImage, setMainImage] = useState(
        initialProduct?.primary_image || initialProduct?.images?.[0]?.uuid || null
    );

    if (!initialProduct) return <Loading />;

    const productData = initialProduct;

    return (
        <>
            <Navbar/>
            <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="px-5 lg:px-16 xl:px-20">
                        <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
                            <Image
                                src={getImageUrl(mainImage)}
                                alt={productData.title}
                                className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
                                width={800}
                                height={800}
                                loading={'eager'}
                            />
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {productData.images.map((image, index) => (
                                <div
                                    key={index}
                                    onClick={() => setMainImage(image.uuid)}
                                    className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                                >
                                    <Image
                                        src={getImageUrl(image.uuid)} alt="alt"
                                        className="w-full h-auto object-cover mix-blend-multiply"
                                        width={1280}
                                        height={720}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
                            {productData.title}
                        </h1>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                                <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon"/>
                                <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon"/>
                                <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon"/>
                                <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon"/>
                                <Image className="h-4 w-4" src={assets.star_dull_icon} alt="star_dull_icon"/>
                            </div>
                            <p>(4.5)</p>
                        </div>
                        <div
                            className="text-gray-600 mt-3"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(productData.description),
                            }}
                        />
                        <p className="text-3xl font-medium mt-6">
                            Rs {productData.prices[0].discounted_price}
                            {productData.prices[0].discount_value && (
                                <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                         Rs {productData.prices[0].price}
                        </span>
                            )}
                        </p>
                        <hr className="bg-gray-600 my-6"/>
                        <div className="overflow-x-auto">

                            <ul className="list-disc pl-5 text-gray-700">
                                {productData.properties.map((item, index) => (
                                    <li key={index}>{item.name}</li>
                                ))}
                            </ul>

                        </div>

                        <div className="flex items-center mt-10 gap-4">
                            <button
                                onClick={() => addToCart(productData)}
                                className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={() => {
                                    addToCart(productData);
                                    router.push(userData ? '/cart' : '');
                                }}
                                className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition"
                            >
                                Buy now
                            </button>
                        </div>
                    </div>
                </div>

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
            </div>
            <Footer/>
        </>
    );
};

export default ProductClient;
