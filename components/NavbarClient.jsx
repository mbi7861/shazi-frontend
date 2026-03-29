// app/components/NavbarClient.jsx
"use client";

import { useEffect, useState } from "react";
import { BagIcon, CartIcon, ProfileIcon } from "@/assets/assets";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "./AuthModal";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import CartModal from "./CartModal";
import { NAV_ITEMS } from "./Navbar"; // reuse the same list

// ─── Mobile slide-out menu ───────────────────────────────────────────────────
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
        className={`absolute inset-y-0 right-0 flex min-w-0 max-w-[85vw] flex-col gap-1 overflow-y-auto border-l border-white/10 bg-[rgba(20,20,26,0.88)] px-6 py-6 backdrop-blur-[30px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] w-[300px] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="mb-4 self-end rounded-lg border border-white/12 bg-white/8 px-3 py-2 text-[18px] text-white/80"
        >
          ✕
        </button>
        {/* ✅ Real <a> links in mobile menu too — crawlable */}
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="mb-0.5 block rounded-[10px] px-[14px] py-3 font-['Cormorant_Garamond',Georgia,serif] text-[16px] font-semibold tracking-[0.04em] text-white/90 no-underline"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Main export: interactive-only island ────────────────────────────────────
export default function NavbarClient() {
  const { cartCount } = useCart();
  const { userData } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [authOpen,       setAuthOpen]       = useState(false);
  const [cartOpen,       setCartOpen]       = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  const handleCartClick = () => {
    if (pathname === "/checkout") router.push("/cart");
    else setCartOpen(true);
  };

  return (
    <>
      {/* ── Desktop action buttons (right side) ── */}
      <div className="hidden whitespace-nowrap items-center gap-3 rounded-r-none rounded-l-full text-white font-semibold tracking-[0.04em] bg-gradient-to-tl from-white/20 via-white/10 to-white/20 px-5 py-3 shadow-[0_18px_60px_rgba(10,23,42,0.15)] backdrop-blur-2xl md:flex bg-black/50">
        <button
          onClick={handleCartClick}
          aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
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
          <Link
            href="/my-orders"
            aria-label="My orders"
            className="flex items-center px-1"
          >
            <BagIcon />
          </Link>
        ) : (
          <button
            onClick={() => setAuthOpen(true)}
            aria-label="Sign in"
            className="flex items-center px-1"
          >
            <ProfileIcon />
          </button>
        )}
      </div>

      {/* ── Mobile action buttons ── */}
      <div className="flex items-center md:hidden gap-3 whitespace-nowrap rounded-r-none rounded-l-full text-white font-semibold bg-gradient-to-tl from-white/20 via-white/10 to-white/20 px-5 py-1.5 shadow-[0_18px_60px_rgba(10,23,42,0.15)] backdrop-blur-2xl bg-black/50">
        <button
          onClick={handleCartClick}
          aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
          className="relative"
        >
          <CartIcon />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 text-xs text-black bg-white w-4 h-4 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>

        {userData ? (
          <Link href="/my-orders" aria-label="My orders" className="flex items-center px-1">
            <BagIcon />
          </Link>
        ) : (
          <button onClick={() => setAuthOpen(true)} aria-label="Sign in" className="flex items-center px-1">
            <ProfileIcon />
          </button>
        )}

        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          className="inline-flex items-center justify-center h-10 rounded-md hover:bg-white/10 transition-colors"
        >
          <span className="flex flex-col gap-1" aria-hidden="true">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </span>
        </button>
      </div>

      {/* ── Portals ── */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <AuthModal   isOpen={authOpen}       onClose={() => setAuthOpen(false)} />
      <CartModal   isOpen={cartOpen}       onClose={() => setCartOpen(false)} />
    </>
  );
}