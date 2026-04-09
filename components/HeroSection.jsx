import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/hero-vid.gif";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Elegant jewelry background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_0,rgba(0,0,0,0.7)_55%,rgba(0,0,0,0.94)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 text-center text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/65">
            Shazi Jewels • Fine Jewelry
          </p>

          <h1 className="mb-3 font-['Cormorant_Garamond',Georgia,serif] text-[40px] leading-tight sm:text-[52px] md:text-[60px] lg:text-[64px]">
            Discover Your Sparkle
          </h1>

          <p className="mb-8 max-w-xl text-sm text-white/75 sm:text-[15px]">
            Welcome to Shazi Jewels, where brilliance meets artistry. Every
            piece is handcrafted with precision and love.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/all-products"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-900 shadow-[0_18px_55px_rgba(0,0,0,0.65)] transition hover:bg-neutral-100"
            >
              Buy Now
            </Link>

            <Link
              href="/categories"
              className="inline-flex items-center justify-center rounded-full border border-white/80 bg-white/5 px-8 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:bg-white/12"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

