import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#E6E9F2] mt-10">
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="w-4/5">
          {/*<Image className="w-28 md:w-32" src={assets.logo} alt="logo" />*/}
          <h3 className="text-2xl md:text-2xl text-orange-600"> <span
              className="font-semibold">Dilawar Traders</span></h3>
          <p className=" text-sm text-gray-600 font-medium">
            Your safety is our best priority
          </p>
          <p className="mt-6 text-sm">
            Dilawar Traders is your trusted source for quality electrical and home supplies. We specialize in breakers, lights, heaters, and other essential electronics for your home. With a commitment to safety and reliability, we provide products that meet the highest standards to keep your home and family safe.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Company Information</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link className="hover:underline transition" href="/">Home</Link>
              </li>
              <li>
                <Link className="hover:underline transition" href="/about-us">About us</Link>
              </li>
              <li>
                <Link className="hover:underline transition" href="/contact-us">Contact us</Link>
              </li>
              <li>
                <Link className="hover:underline transition" href="/privacy-policy">Privacy policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>Contact us for inquiries</p>
              <p>info@dilawartraders.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm">
        Copyright 2025 © dilawarTraders.com All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;