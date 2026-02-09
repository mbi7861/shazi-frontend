"use client"
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const HeaderSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderData = [
    {
      id: 1,
      title: "Experience Breakers - Your Safety Awaits!",
      offer: "Limited Time Offer 30% Off",
      link: "/all-products?category=breakers",
      imgSrc: assets.categories.breakers,
    },
    {
      id: 2,
      title: "Next-Level Sockets - Discover safe Socket!",
      offer: "Hurry up only few lefts!",
      link: "/all-products?category=sockets",
      imgSrc: assets.categories.sockets,
    },
  ];
  
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

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => {

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
                    <Link href={slide.link} className="border border-orange-600 text-orange-600 px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                      Explore More
                    </Link>
                  </div>
                </div>
                <div className="flex-1 flex justify-center md:justify-end">
                  <Image
                    src={slide.imgSrc}
                    alt={slide.title}
                    width={400}
                    height={400}
                    className=" h-64 md:h-80 object-contain"
                  />
                </div>
              </div>
            );
          
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
