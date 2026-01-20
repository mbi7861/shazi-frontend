"use client"
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useProducts } from "@/context/ProductContext";
import { apiServiceConfig } from "@/app/config/apiService";

const HeaderSlider = ({ featuredProducts: ssrFeaturedProducts }) => {
  const { getFeaturedProducts, isLoading } = useProducts();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Get featured products from context if SSR products not provided
  const contextFeaturedProducts = getFeaturedProducts();
  const featuredProducts = ssrFeaturedProducts && ssrFeaturedProducts.length > 0 
    ? ssrFeaturedProducts 
    : contextFeaturedProducts;

  // Fallback data if no featured products are available
  const fallbackData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Explore more",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_macbook_image,
    },
  ];

  // Use featured products if available, otherwise use fallback
  const sliderData = featuredProducts && featuredProducts.length > 0 ? featuredProducts : fallbackData;

  useEffect(() => {
    if (sliderData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  if (isLoading && (!featuredProducts || featuredProducts.length === 0)) {
    return (
      <div className="overflow-hidden relative w-full">
        <div className="flex items-center justify-center bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-h-[300px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading featured products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => {
          // Check if this is a featured product or fallback data
          const isFeaturedProduct = slide.product_items || slide.primary_image || slide.images;

          if (isFeaturedProduct && !slide.imgSrc) {
            // Featured product from API
            const defaultItem = slide.product_items?.find(item => item.is_default) || slide.product_items?.[0];
            const price = defaultItem?.price?.discounted_price || defaultItem?.price?.price || 0;
            const imageUUID = slide.primary_image || slide.images?.find(img => img.is_preview)?.uuid || slide.images?.[0]?.uuid;
            const imageBaseUrl = apiServiceConfig.imageBaseUrl;
            const imageUrl = imageUUID
              ? `${imageBaseUrl}/products/${imageUUID}`
              : "/placeholder.svg";

            return (
              <div
                key={slide.id}
                className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
              >
                <div className="md:pl-8 mt-10 md:mt-0">
                  <p className="md:text-base text-orange-600 pb-1">Featured Category</p>
                  <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                    {slide.title}
                  </h1>
                  <p className="text-lg font-medium text-gray-700 mt-2">
                    {price > 0 ? `Rs. ${price}` : 'Price on request'}
                  </p>
                  {slide.offer && <p className="text-sm text-gray-600 mt-1">{slide.offer}</p>}
                  <div className="flex gap-3 mt-6">
                    {/* <button 
                      onClick={() => window.location.href = `/product/${slide.slug}`}
                      className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                    >
                      {slide.buttonText1 || 'Buy now'}
                    </button> */}
                    <button 
                      onClick={() => window.location.href = '/all-products'}
                      className="border border-orange-600 text-orange-600 px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors"
                    >
                      {slide.buttonText2 || 'Explore more'}
                    </button>
                  </div>
                </div>
                <div className="flex-1 flex justify-center md:justify-end">
                  <Image
                    src={imageUrl}
                    alt={slide.title}
                    width={400}
                    height={400}
                    className="w-64 h-64 md:w-80 md:h-80 object-contain"
                  />
                </div>
              </div>
            );
          } else {
            // Fallback data
            return (
              <div
                key={slide.id}
                className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
              >
                <div className="md:pl-8 mt-10 md:mt-0">
                  <p className="md:text-base text-orange-600 pb-1">Featured Category</p>
                  <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                    {slide.title}
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">{slide.offer}</p>
                  <div className="flex gap-3 mt-6">
                    {/* <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                      {slide.buttonText1}
                    </button> */}
                    <button className="border border-orange-600 text-orange-600 px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                      {slide.buttonText2}
                    </button>
                  </div>
                </div>
                <div className="flex-1 flex justify-center md:justify-end">
                  <Image
                    src={slide.imgSrc}
                    alt={slide.title}
                    width={400}
                    height={400}
                    className="w-64 h-64 md:w-80 md:h-80 object-contain"
                  />
                </div>
              </div>
            );
          }
        })}
      </div>

      {/* Slide indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-orange-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
