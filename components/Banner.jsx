import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Banner = () => {
  return (
      <div className="flex flex-col md:flex-row items-center justify-between md:pl-10 py-14 md:py-0 bg-[#E6E9F2] my-16 rounded-xl overflow-hidden">
          {/* Left Image */}
          <div className="flex-[3] flex justify-center">
              <Image
                  className="max-w-40 md:max-w-56"
                  src={assets.banner1}
                  alt="banner1"
              />
          </div>

          {/* Center Content */}
          <div className="flex-[5] flex flex-col items-center justify-center text-center space-y-4 px-4 md:px-4">
              <h2 className="text-3xl md:text-4xl font-semibold max-w-[500px] leading-tight">
                  Power Up Your Home with Reliable Electronics
              </h2>
              <p className="max-w-[500px] font-medium text-gray-800/70 text-base md:text-lg">
                  Explore breakers, lights, and more—engineered for safety and performance.
              </p>
              <button className="group flex items-center justify-center gap-1 px-12 py-3 bg-orange-600 rounded text-white text-sm md:text-base">
                  Shop now
                  <Image className="group-hover:translate-x-1 transition" src={assets.arrow_icon_white} alt="arrow_icon_white" />
              </button>
          </div>

          {/* Right Image */}
          <div className="flex-[3] hidden md:flex justify-center ">
              <Image
                  className="hidden md:block max-w-40 md:max-w-56"
                  src={assets.banner1}
                  alt="md_controller_image"
              />
              <Image
                  className="md:hidden max-w-40"
                  src={assets.banner1}
                  alt="sm_controller_image"
              />
          </div>
      </div>

  );
};

export default Banner;