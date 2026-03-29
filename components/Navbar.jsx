// app/components/Navbar.jsx
// NO "use client" — stays a server component

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { assets } from "@/assets/assets";
import NavbarClient from "./NavbarClient";

export const NAV_ITEMS = [
  { label: "Home",       href: "/" },
  { label: "Shop",       href: "/all-products" },
  { label: "About Us",   href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Navbar() {
  return (
    <>
      <header
        className="fixed top-0 z-50 w-full px-0 py-2"
        role="banner"
      >
        <div className="flex items-center justify-between px-0 py-2">

          {/* Logo — server rendered, no JS needed */}
          <div className="flex h-auto items-center justify-center rounded-r-full rounded-l-none bg-gradient-to-tl from-white/20 via-white/10 to-white/20 p-2 shadow-[0_18px_60px_rgba(10,23,42,0.15)] backdrop-blur-2xl md:flex bg-black/50">
            <Link href="/" aria-label="Shazi Jewels — Home">
              <Image
                src={assets.logo}
                alt="Shazi Jewels logo"
                width={100}
                height={100}
                priority    // ✅ LCP: preloads logo image
              />
            </Link>
          </div>

          {/*
            ✅ SEO: <nav> with aria-label is the primary crawlable element.
            All hrefs are real links — no onClick-only navigation.
          */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-0.5 rounded-full bg-gradient-to-tl from-white/20 via-white/10 to-white/20 px-2.5 py-1.5 shadow-[0_18px_60px_rgba(10,23,42,0.15)] backdrop-blur-2xl md:flex bg-black/50"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1 whitespace-nowrap rounded-lg px-[13px] py-[7px] font-[family-name:var(--font-cormorant)] text-[16px] font-semibold tracking-[0.04em] no-underline bg-transparent text-white hover:bg-white/10 hover:text-white transition-all"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/*
            Client island: cart count, auth state, mobile menu, modals.
            Suspense boundary required because NavbarClient uses useSearchParams().
            fallback keeps the right side from flickering.
          */}
          <Suspense fallback={<NavbarRightSkeleton />}>
            <NavbarClient />
          </Suspense>

        </div>
      </header>
    </>
  );
}

// Shown instantly (server-side) while the client island hydrates.
// Matches the shape of the real buttons so layout doesn't shift.
function NavbarRightSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-l-full bg-black/50 px-5 py-3 backdrop-blur-2xl opacity-60">
      <div className="w-5 h-5 rounded-full bg-white/20" />
      <div className="w-5 h-5 rounded-full bg-white/20" />
    </div>
  );
}