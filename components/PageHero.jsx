import React from "react";
import Link from "next/link";
import { assets } from "@/assets/assets";

const PageHero = ({ title, parentLinks = [] }) => {
  return (
    <div
      className="flex items-end border-b-2 border-shazi-gold bg-cover bg-center bg-no-repeat h-[160px]"
      style={{
        backgroundImage: `url(${assets.heroImage?.src || assets.heroImage})`,
        backgroundPosition: '0% 30%',
      }}
    >
      <div className="mx-16">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-grey-300 mb-8"
        >
          <Link className="hover:text-primary" href="/">
            Home
          </Link>
          
          {parentLinks.map((link, index) => (
            <React.Fragment key={index}>
              &gt;
              <Link className="hover:text-primary" href={link.href}>
                {link.label}
              </Link>
            </React.Fragment>
          ))}

          &gt;
          <span className="text-white font-semibold">{title}</span>
        </nav>
      </div>
    </div>
  );
};

export default PageHero;
