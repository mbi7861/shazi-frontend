'use client';

import { useEffect, useState } from 'react';
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import NavigationLink from "./NavigationLink";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import AuthModal from './AuthModal';
import { useSearchParams, useRouter } from "next/navigation";
import CartModal from "./CartModal";
import { useNavigationLoading } from "@/context/NavigationLoadingContext";

export default function NavbarClient() {
    const { cartCount } = useCart();
    const { userData } = useAuth();
    const router = useRouter();
    const { setLoading } = useNavigationLoading();
    const [authOpen, setAuthOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [search, setSearch] = useState('');
    const searchParams = useSearchParams();

    useEffect(() => {
        const initialSearch = searchParams.get('search') || '';
        setSearch(initialSearch);
    }, [searchParams]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        setLoading(true);
        router.push(`/all-products?search=${encodeURIComponent(search.trim())}`);
    };

    const openAuthModal = () => setAuthOpen(true);
    const closeAuthModal = () => setAuthOpen(false);
    const openCartModal = () => setCartOpen(true);
    const closeCartModal = () => setCartOpen(false);

    return (
        <>
            <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
                <NavigationLink href="/" className="hover:text-gray-900 transition">Home</NavigationLink>
                <NavigationLink href="/all-products" className="hover:text-gray-900 transition">Shop</NavigationLink>
                <NavigationLink href="/" className="hover:text-gray-900 transition">About Us</NavigationLink>
                <NavigationLink href="/contact-us" className="hover:text-gray-900 transition">Contact</NavigationLink>
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

                <div onClick={openCartModal} className="relative cursor-pointer">
                    <CartIcon/>
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>
                    )}
                </div>
                {userData ? (
                    <>
                        <button onClick={() => {
                            setLoading(true);
                            router.push('/my-orders');
                        }}
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
            
            <div className="flex items-center md:hidden gap-3">
                {userData ? (
                    <>
                        <button
                            onClick={() => {
                                setLoading(true);
                                router.push('/');
                            }}
                            className="hidden sm:flex items-center gap-1 text-sm hover:text-gray-900 transition"
                        >
                            <HomeIcon />
                            Home
                        </button>

                        <button
                            onClick={() => {
                                setLoading(true);
                                router.push('/all-products');
                            }}
                            className="hidden sm:flex items-center gap-1 text-sm hover:text-gray-900 transition"
                        >
                            <BoxIcon />
                            Products
                        </button>

                        <div onClick={openCartModal} className="relative cursor-pointer">
                            <CartIcon/>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>
                            )}
                        </div>
                        <button onClick={() => {
                            setLoading(true);
                            router.push('/my-orders');
                        }}
                                className="flex items-center gap-1 text-sm hover:text-gray-900 transition">
                            <BagIcon/>
                            Orders
                        </button>
                    </>
                ) : (
                    <button onClick={openAuthModal} className="flex items-center gap-2 hover:text-gray-900 transition">
                        <Image src={assets.user_icon} alt="user icon"/>
                        Account
                    </button>
                )}
            </div>
        </>
    );
} 