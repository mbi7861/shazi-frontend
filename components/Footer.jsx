import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative mt-10 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${assets.footerBg?.src ?? assets.footerBg})` }}
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0" />
      <div className="relative flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-white/20 text-gray-100">
        <div className="w-4/5">
          {/*<Image className="w-28 md:w-32" src={assets.logo} alt="logo" />*/}
          <Image src={assets.logo} alt="logo" width={200} />
          <p className=" text-sm text-white/90 font-medium">
            Your safety is our best priority
          </p>
          <p className="mt-6 text-sm text-gray-200">
            shazijewels is your trusted source for quality electrical and home supplies. We specialize in breakers, lights, heaters, and other essential electronics for your home. With a commitment to safety and reliability, we provide products that meet the highest standards to keep your home and family safe.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-white mb-5">Company Information</h2>
            <ul className="text-sm space-y-2 text-gray-200">
              <li>
                <Link className="hover:underline transition text-gray-100 hover:text-white" href="/">Home</Link>
              </li>
              <li>
                <Link className="hover:underline transition text-gray-100 hover:text-white" href="/about-us">About us</Link>
              </li>
              <li>
                <Link className="hover:underline transition text-gray-100 hover:text-white" href="/contact-us">Contact us</Link>
              </li>
              <li>
                <Link className="hover:underline transition text-gray-100 hover:text-white" href="/privacy-policy">Privacy policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-white mb-5">Get in touch</h2>
            <div className="text-sm space-y-2 text-gray-200">
              <p>Contact us for inquiries</p>
              <p>info@shazijewels.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="relative py-4 text-center text-xs md:text-sm text-gray-300">
        Copyright 2025 © shazijewels.com All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;