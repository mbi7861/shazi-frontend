'use client';
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "#" },
  {
    label: "About Us",
    href: "#",
    children: ["Our Story", "Team", "Mission"],
  },
  {
    label: "Collection",
    href: "#",
    children: ["New Arrivals", "Bestsellers", "Seasonal"],
  },
  {
    label: "Customization",
    href: "#",
    children: ["Engrave", "Custom Design", "Packaging"],
  },
  {
    label: "Materials",
    href: "#",
    children: ["Gold", "Silver", "Gemstones"],
  },
  { label: "Contact Us", href: "#" },
];

function Logo() {
  return (
    <div
      className="flex h-10 items-center justify-center rounded-r-full rounded-l-none bg-gradient-to-tl from-white/20 via-white/10 to-white/20 px-5 py-1.5 shadow-[0_18px_60px_rgba(10,23,42,0.15)] backdrop-blur-2xl md:flex bg-black/30"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C9 2 6 4 6 7c0 2 1.5 3.5 3 4.5L7 21h10l-2-9.5C16.5 10.5 18 9 18 7c0-3-3-5-6-5z"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="12" cy="7" r="1.5" fill="rgba(255,255,255,0.7)" />
      </svg>
    </div>
  );
}

function DropdownMenu({ items, isOpen }) {
  return (
    <div
      className={`absolute left-1/2 top-full mt-2 min-w-[160px] -translate-x-1/2 transform rounded-[14px] border border-white/20 bg-gradient-to-b from-white/15 via-white/10 to-white/20 px-2 py-2 text-left shadow-[0_20px_60px_rgba(15,23,42,0.65)] backdrop-blur-2xl backdrop-saturate-[1.8] transition-all duration-200 z-[100] origin-top ${
        isOpen
          ? "pointer-events-auto scale-y-100 translate-y-0 opacity-100"
          : "pointer-events-none scale-y-[0.92] -translate-y-1.5 opacity-0"
      }`}
    >
      {items.map((item, i) => (
        <div key={i}>
          <a
            href="#"
            className="block whitespace-nowrap rounded-lg px-[14px] py-[9px] font-['Cormorant_Garamond',Georgia,serif] text-[18px] font-medium tracking-[0.03em] text-[rgba(255,255,255,0.78)] no-underline transition-colors hover:bg-[rgba(255,255,255,0.08)] hover:text-white"
          >
            {item}
          </a>
        </div>
      ))}
    </div>
  );
}

function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div
      className="relative"
      onMouseEnter={() => hasChildren && setOpen(true)}
      onMouseLeave={() => hasChildren && setOpen(false)}
    >
      <a
        href={item.href}
        className={`flex items-center gap-1 whitespace-nowrap rounded-lg px-[13px] py-[7px] font-['Cormorant_Garamond',Georgia,serif] text-[13.5px] font-semibold tracking-[0.04em] no-underline transition-all ${
          open
            ? "bg-[rgba(255,255,255,0.07)] text-white"
            : "bg-transparent text-[rgba(255,255,255,0.82)] hover:bg-[rgba(255,255,255,0.07)] hover:text-white"
        }`}
      >
        {item.label}
        {hasChildren && (
          <svg
            width="11" height="11" viewBox="0 0 12 12" fill="none"
            className={`mt-[1px] opacity-70 transition-transform ${
              open ? "rotate-180" : "rotate-0"
            }`}
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </a>
      {hasChildren && <DropdownMenu items={item.children} isOpen={open} />}
    </div>
  );
}

function MobileMenu({ isOpen, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-[200] ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Drawer */}
      <div
        className={`absolute inset-y-0 right-0 flex min-w-0 max-w-[85vw] flex-col gap-1 overflow-y-auto border-l border-[rgba(255,255,255,0.1)] bg-[rgba(20,20,26,0.88)] px-6 py-6 backdrop-blur-[30px] backdrop-saturate-[1.8] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden w-[300px]`}
      >
        <button
          onClick={onClose}
          className="mb-4 self-end rounded-lg border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] px-3 py-2 text-[18px] text-[rgba(255,255,255,0.8)]"
        >
          ✕ Close
        </button>
        {NAV_ITEMS.map((item, i) => (
          <div key={i}>
            <a
              href={item.href}
              className={`mb-0.5 block rounded-[10px] px-[14px] py-3 font-['Cormorant_Garamond',Georgia,serif] text-[16px] font-semibold tracking-[0.04em] text-[rgba(255,255,255,0.9)] no-underline ${
                item.children ? "border-b border-[rgba(255,255,255,0.07)]" : ""
              }`}
            >
              {item.label}
            </a>
            {item.children && item.children.map((child, j) => (
              <a
                key={j}
                href="#"
                className="block rounded-lg px-7 py-[9px] font-['Cormorant_Garamond',Georgia,serif] text-[14px] text-[rgba(255,255,255,0.55)] no-underline"
              >
                {child}
              </a>
            ))}
          </div>
        ))}
        <div className="mt-auto pt-5">
          <button
            className="flex w-full items-center justify-center gap-2 rounded-[12px] 
             bg-[rgba(255,255,255,0.1)] px-4 py-3 font-['Cormorant_Garamond',Georgia,serif] text-[15px] text-[rgba(255,255,255,0.9)]"
          >
            🛍 
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GlassHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <header
        className={`sticky top-0 z-50 px-0 py-2 transition-[padding,box-shadow] duration-300 `}
      >
        {/* Floating bar */}
        <div className="flex items-center justify-between px-0 py-2">
          <Logo />

          {/* Desktop Nav — pill shaped glass */}
          <nav className="hidden items-center gap-0.5 rounded-full bg-gradient-to-tl from-white/20 via-white/10 to-white/20 px-2.5 py-1.5 shadow-[0_18px_60px_rgba(10,23,42,0.15)] backdrop-blur-2xl md:flex bg-black/30">
            {NAV_ITEMS.map((item, i) => (
              <NavItem key={i} item={item} />
            ))}
          </nav>

          {/* Cart button with subtle dark glass */}
          <button className="hidden whitespace-nowrap items-center gap-2 rounded-r-none rounded-l-full text-white font-['Cormorant_Garamond',Georgia,serif] text-[18px] font-semibold tracking-[0.04em] bg-gradient-to-tl from-white/20 via-white/10 to-white/20 px-5 py-3 shadow-[0_18px_60px_rgba(10,23,42,0.15)] backdrop-blur-2xl md:flex bg-black/30">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center rounded-[10px] border border-[rgba(255,255,255,0.12)] bg-black/30 px-[11px] py-[9px] text-[16px] text-white md:hidden backdrop-blur-md"
          >
            ☰
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}