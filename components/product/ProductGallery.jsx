"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getImageUrl } from "@/app/utils/utils";

const ProductGallery = ({ images, productTitle, primaryImage }) => {
    const [mainImage, setMainImage] = useState(
        primaryImage || images?.[0]?.uuid || null
    );

    // Update main image when variant's primary_image changes
    useEffect(() => {
        setMainImage(primaryImage || images?.[0]?.uuid || null);
    }, [primaryImage, images]);

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4 aspect-square">
                <Image
                    src={getImageUrl(mainImage)}
                    alt={productTitle}
                    className="group-hover:scale-105 transition object-cover md:w-full md:h-full"
                    width={800}
                    height={800}
                    loading={'eager'}
                />
            </div>

            <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <div
                        key={index}
                        onClick={() => setMainImage(image.uuid)}
                        className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10 aspect-square"
                    >
                        <Image
                            src={getImageUrl(image.uuid)}
                            alt="alt"
                            className="w-full h-auto object-cover mix-blend-multiply"
                            width={1280}
                            height={720}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGallery;




