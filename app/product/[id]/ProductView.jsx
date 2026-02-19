"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/product/ProductGallery";
import ProductVariants from "@/components/product/ProductVariants";
import ProductPrice from "@/components/product/ProductPrice";
import ProductProperties from "@/components/product/ProductProperties";
import RelatedProductsGrid from "@/components/product/RelatedProductsGrid";
import AddToCartButton from "@/components/product/AddToCartButton";
import BuyNowButton from "@/components/product/BuyNowButton";
import { getDefaultProductItem } from "@/lib/product/getDefaultProductItem";
import { matchVariant } from "@/lib/product/matchVariant";

const ProductView = ({ initialProduct, relatedProducts }) => {
    const productData = initialProduct;
    const productItems = productData?.product_items || [];
    const defaultItem = getDefaultProductItem(productItems);
    const variations = initialProduct.variations;
    
    const getInitialSelectedOptions = () => {
        const options = {};
        variations.forEach(variation => {
            if (variation.options.length > 0) {
                options[variation.id] = variation.options[0].id;
            }
        });
        return options;
    };
    
    const [selectedOptions, setSelectedOptions] = useState(() => getInitialSelectedOptions());
    const [currentItem, setCurrentItem] = useState(defaultItem);
    
    useEffect(() => {
        if (productItems.length === 0) return;
    
        const matchedItem = matchVariant(productItems, selectedOptions);
    
        if (matchedItem) {
            setCurrentItem(matchedItem);
        } else {
            setCurrentItem(defaultItem);
        }
    }, [selectedOptions, productItems, defaultItem]);
    
    const price = currentItem?.price?.discounted_price || 0;
    const originalPrice = currentItem?.price?.price;
    const hasDiscount = currentItem?.price?.discount_value !== null;
    
    const handleOptionSelect = (variation_id, option) => {
        setSelectedOptions(prev => ({
            ...prev,
            [variation_id]: option.id
        }));
        console.log('selectedOptions', selectedOptions);
    };
    

    return (
        <>
            <Navbar/>
            <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <ProductGallery
                        images={productData.images}
                        productTitle={productData.title}
                        primaryImage={currentItem?.primary_image || productData.primary_image}
                    />

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

                        <ProductVariants
                            variations={variations}
                            selectedOptions={selectedOptions}
                            onOptionSelect={handleOptionSelect}
                        />

                        <ProductPrice
                            price={price}
                            originalPrice={originalPrice}
                            hasDiscount={hasDiscount}
                        />
                        
                        <hr className="bg-gray-600 my-6"/>

                        <ProductProperties properties={productData.properties} />

                        <div className="flex items-center mt-10 gap-4">
                            <AddToCartButton
                                currentItem={currentItem}
                                productData={productData}
                            />
                            <BuyNowButton
                                currentItem={currentItem}
                                productData={productData}
                            />
                        </div>
                    </div>
                </div>

                <RelatedProductsGrid relatedProducts={relatedProducts} />
            </div>
            <Footer/>
        </>
    );
};

export default ProductView;

