'use client';

import { useEffect, useState } from 'react';
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import AuthModal from './AuthModal';
import { useSearchParams, useRouter , usePathname } from "next/navigation";
import CartModal from "./CartModal";

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
        console.log(pathname);
        
        if (pathname === '/checkout') {
          router.push('/cart');
        } else {
          openCartModal();
        }
      };

    return (
        <>
            <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
                {/* <Link href="/" className="hover:text-gray-900 transition">Home</Link> */}
                <Link href="/all-products" className="hover:text-gray-900 transition">Shop</Link>
                <Link href="/" className="hover:text-gray-900 transition">About Us</Link>
                <Link href="/contact-us" className="hover:text-gray-900 transition">Contact</Link>
            </div>

            <ul className="hidden md:flex items-center gap-4">
                <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full max-lg:hidden">
                    <input
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        placeholder="Search products"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Image className="w-4 h-4" onClick={handleSearch} src={assets.search_icon} alt="search icon"/>
                </div>

                <div onClick={handleClick} className="relative cursor-pointer">
                    <CartIcon/>
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>
                    )}
                </div>
                {userData ? (
                    <>
                        <button onClick={() => router.push('/my-orders')}
                                className="flex items-center gap-2 text-sm hover:text-gray-900 transition">
                            <BagIcon/>
                        </button>
                    </>
                ) : (
                    <button onClick={openAuthModal} className="flex items-center gap-2 hover:text-gray-900 transition">
                        <Image src={assets.user_icon} alt="user icon"/>
                        Account
                    </button>
                )}
            </ul>

            <AuthModal isOpen={authOpen} onClose={closeAuthModal}/>
            <CartModal isOpen={cartOpen} onClose={closeCartModal} />
            
            <div className="flex items-center md:hidden gap-4">
                
                {userData ? (
                    <>
                        <button
                            onClick={() => router.push('/')}
                            className="hidden sm:flex items-center gap-1 text-sm hover:text-gray-900 transition"
                        >
                            <HomeIcon />
                            Home
                        </button>

                        <button
                            onClick={() => router.push('/all-products')}
                            className="hidden sm:flex items-center gap-1 text-sm hover:text-gray-900 transition"
                        >
                            <BoxIcon />
                            Products
                        </button>

                        
                        <button onClick={() => router.push('/my-orders')}
                                className="flex items-center gap-1 text-sm hover:text-gray-900 transition">
                            <BagIcon/>
                            Orders
                        </button>
                    </>
                ) : (
                    <>
                    <div onClick={handleClick} className="relative cursor-pointer">
                            <CartIcon/>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>
                            )}
                        </div>
                    <button onClick={openAuthModal} className="flex items-center gap-2  hover:text-gray-900 transition">
                        <Image src={assets.user_icon} alt="user icon"/>
                        <h1 className="hidden md:block">Account</h1> 
                        </button>
                    </>
                )}
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen((prev) => !prev)}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-md text-gray-600 hover:text-orange-600 transition-colors"
                    aria-label="Toggle navigation"
                    aria-expanded={mobileMenuOpen}
                    aria-controls="mobile-full-nav"
                >
                    <span className="flex flex-col gap-1">
                        <span className="block h-0.5 w-5 bg-current"></span>
                        <span className="block h-0.5 w-5 bg-current"></span>
                        <span className="block h-0.5 w-5 bg-current"></span>
                    </span>
                </button>
            </div>

            <div
                id="mobile-full-nav"
                className={`fixed inset-0 z-30 bg-white md:hidden ${
                    mobileMenuOpen ? 'block' : 'hidden'
                }`}
            >
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                        <span className="text-lg font-semibold text-gray-700"></span>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="inline-flex items-center justify-center w-10 h-10 rounded-md text-gray-500 hover:text-orange-600hover:bg-orange-50 transition-colors"
                            aria-label="Close menu"
                        >
                            <span className="text-3xl leading-none">×</span>
                        </button>
                    </div>
                    <div className="flex flex-col gap-4 px-6 py-6 text-base">
                        <Link
                            href="/all-products"
                            onClick={() => setMobileMenuOpen(false)}
                            className="hover:text-gray-900 transition"
                        >
                            Shop
                        </Link>
                        <Link
                            href="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="hover:text-gray-900 transition"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/contact-us"
                            onClick={() => setMobileMenuOpen(false)}
                            className="hover:text-gray-900 transition"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
} 