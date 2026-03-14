'use client';

import { useEffect, useState } from 'react';
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon, ProfileIcon } from "@/assets/assets";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import AuthModal from './AuthModal';
import { useSearchParams, useRouter , usePathname } from "next/navigation";
import CartModal from "./CartModal";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/all-products" },
  { label: "About Us", href: "/" },
  { label: "Contact Us", href: "/contact-us" },
];

function Logo() {
  return (
    <div
      className="flex h-auto items-center justify-center rounded-r-full rounded-l-none bg-gradient-to-tl from-white/20 via-white/10 to-white/20 p-2 shadow-[0_18px_60px_rgba(10,23,42,0.15)] backdrop-blur-2xl md:flex bg-black/50"
    >
      <Image src={assets.logo} alt="logo" width={100} height={100} />
    </div>
  );
}

function NavItem({ item }) {
  return (
    <Link
      href={item.href}
      className="flex items-center gap-1 whitespace-nowrap rounded-lg px-[13px] py-[7px] font-['Cormorant_Garamond',Georgia,serif] text-[16px] font-semibold tracking-[0.04em] no-underline bg-transparent text-[rgba(255,255,255,0.82)] hover:bg-[rgba(255,255,255,0.07)] hover:text-white transition-all"
    >
      {item.label}
    </Link>
  );
}

function MobileMenu({ isOpen, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-[200] ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute inset-y-0 right-0 flex min-w-0 max-w-[85vw] flex-col gap-1 overflow-y-auto border-l border-[rgba(255,255,255,0.1)] bg-[rgba(20,20,26,0.88)] px-6 py-6 backdrop-blur-[30px] backdrop-saturate-[1.8] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden w-[300px]`}
      >
        <button
          onClick={onClose}
          className="mb-4 self-end rounded-lg border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] px-3 py-2 text-[18px] text-[rgba(255,255,255,0.8)]"
        >
          ✕
        </button>
        {NAV_ITEMS.map((item, i) => (
          <div key={i}>
            <Link
              href={item.href}
              className="mb-0.5 block rounded-[10px] px-[14px] py-3 font-['Cormorant_Garamond',Georgia,serif] text-[16px] font-semibold tracking-[0.04em] text-[rgba(255,255,255,0.9)] no-underline"
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NavbarClient() {
  const { cartCount } = useCart();
  const { userData } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [authOpen, setAuthOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const initialSearch = searchParams.get('search') || '';
    setSearch(initialSearch);
  }, [searchParams]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    router.push(`/all-products?search=${encodeURIComponent(search.trim())}`);
  };

  const openAuthModal = () => setAuthOpen(true);
  const closeAuthModal = () => setAuthOpen(false);
  const openCartModal = () => setCartOpen(true);
  const closeCartModal = () => setCartOpen(false);
  const handleClick = () => {
    if (pathname === '/checkout') {
      router.push('/cart');
    } else {
      openCartModal();
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <header className={`fixed top-0 z-50 px-0 py-2 w-full`}>
        <div className="flex items-center justify-between px-0 py-2">
          <Logo />

          <nav className="hidden items-center gap-0.5 rounded-full bg-gradient-to-tl from-white/20 via-white/10 to-white/20 px-2.5 py-1.5 shadow-[0_18px_60px_rgba(10,23,42,0.15)] backdrop-blur-2xl md:flex bg-black/50">
            {NAV_ITEMS.map((item, i) => (
              <NavItem key={i} item={item} />
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Temporary search bar commented out */}
            {/*
            <div className="hidden md:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full max-lg:hidden bg-white/10 backdrop-blur-md">
              <input
                className="py-1.5 w-full bg-transparent outline-none placeholder-gray-200 text-white"
                placeholder="Search products"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Image
                className="w-4 h-4 cursor-pointer"
                onClick={handleSearch}
                src={assets.search_icon}
                alt="search icon"
              />
            </div>
            */}

            <div className="hidden whitespace-nowrap items-center gap-3 rounded-r-none rounded-l-full text-white  font-semibold tracking-[0.04em] bg-gradient-to-tl from-white/20 via-white/10 to-white/20 px-5 py-3 shadow-[0_18px_60px_rgba(10,23,42,0.15)] backdrop-blur-2xl md:flex bg-black/50">
              <button
                onClick={handleClick}
                className="relative flex items-center gap-2"
              >
                <CartIcon />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 text-xs text-black bg-white w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              {userData ? (
                <button
                  onClick={() => router.push('/my-orders')}
                  className="flex items-center px-1"
                >
                  <BagIcon />
                </button>
              ) : (
                <button
                  onClick={openAuthModal}
                  className="flex items-center px-1"
                >
                  <ProfileIcon />
                </button>
              )}
            </div>

            <div className="flex items-center md:hidden gap-3 whitespace-nowrap rounded-r-none rounded-l-full text-white  font-semibold bg-gradient-to-tl from-white/20 via-white/10 to-white/20 px-5 py-1.5 shadow-[0_18px_60px_rgba(10,23,42,0.15)] backdrop-blur-2xl bg-black/50">
              <div onClick={handleClick} className="relative cursor-pointer">
                <CartIcon />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 text-xs text-black bg-white w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
              {userData ? (
                <button
                  onClick={() => router.push('/my-orders')}
                  className="flex items-center px-1 text-sm text-white hover:text-gray-200 transition"
                >
                  <BagIcon />
                </button>
              ) : (
                <button
                  onClick={openAuthModal}
                  className="flex items-center px-1 text-white hover:text-gray-200 transition"
                >
                  <ProfileIcon/>
                </button>
              )}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="inline-flex items-center justify-center h-10 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Toggle navigation"
                aria-expanded={mobileMenuOpen}
              >
                <span className="flex flex-col gap-1">
                  <span className="block h-0.5 w-5 bg-current"></span>
                  <span className="block h-0.5 w-5 bg-current"></span>
                  <span className="block h-0.5 w-5 bg-current"></span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <AuthModal isOpen={authOpen} onClose={closeAuthModal} />
      <CartModal isOpen={cartOpen} onClose={closeCartModal} />
    </>
  );
}