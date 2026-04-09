'use client';
import { useState } from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';



export default function AboutUs() {
  const [active, setActive] = useState('story');

  return (
    <>
      <Navbar />
      <PageHero title="About Us" />
      <section className="py-12 px-6 md:px-12 lg:px-24  grid grid-cols-1 lg:grid-cols-12 gap-16 items-center overflow-hidden">
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-block px-4 py-1 border border-[#4d4635]/30 text-[10px] uppercase tracking-[0.4em] text-shazi-gold mb-4">
            The Legacy
          </div>
          <h2 className="font-['Noto_Serif'] text-4xl md:text-6xl text-shazi-black leading-tight">
            Our Heritage: <br /> Born in Shadow, <br />{' '}
            <span className="italic">Defined by Light.</span>
          </h2>
          <div className="space-y-6 text-shazi-black font-light leading-loose text-lg">
            <p>
              Founded in the heart of the historic gold district, Shazi Jewels began as a private
              commission house for those who sought more than mere adornment. Our founder, Shazi
              Al-Fayed, believed that jewelry should be an extension of one's soul.
            </p>
            <p>
              What started in a small, candle-lit studio has evolved into a global symbol of quiet
              luxury. We remain committed to the artisanal techniques of the old world, ensuring
              every piece carries the weight of history and the brilliance of modern vision.
            </p>
          </div>
          <button className="group flex items-center space-x-4 pt-4">
            <span className="w-12 h-px bg-[#f2ca50] group-hover:w-20 transition-all duration-500" />
            <span className="uppercase tracking-[0.3em] text-xs font-bold text-[#f2ca50]">
              Discover the Archive
            </span>
          </button>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] overflow-hidden rounded-lg">
            <Image src={assets.about_us} alt="Jewelry" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-[#353534] p-8 max-w-xs hidden md:block">
            <p className="font-['Noto_Serif'] text-3xl text-[#f2ca50] leading-none mb-2">1984</p>
            <p className="text-[10px] uppercase tracking-widest text-[#d0c5af]">
              The year we first captured light in gold.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Crafted with Precision */}
      <section className="py-32 ">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="font-['Noto_Serif'] text-4xl md:text-6xl text-shazi-black mb-8">
              Crafted with Precision
            </h2>
            <p className="text-shazi-black font-light leading-relaxed">
              Our master artisans spend hundreds of hours on a single creation. We do not
              manufacture; we breathe life into raw materials through a synthesis of heritage tools
              and vanguard technology.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 group relative overflow-hidden aspect-[16/9] rounded-sm">
              <img
                alt="Artisan at work"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <h4 className="font-['Noto_Serif'] text-xl text-[#f2ca50] mb-2">Manual Setting</h4>
                <p className="text-xs text-white/70 uppercase tracking-widest">
                  Ensuring every stone finds its forever home.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="aspect-square bg-[#2a2a2a] flex flex-col justify-center p-10 border border-[#4d4635]/10">
                <svg
                  className="w-9 h-9 text-[#f2ca50] mb-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.5 2h11l3 5-10 15L.5 7l6-5zm9.5 0H8l-1.5 4h11L16 2zM3.5 8l7 10.5L17.5 8h-14z" />
                </svg>
                <h3 className="font-['Noto_Serif'] text-2xl text-[#e5e2e1] mb-4">
                  Conflict-Free Stones
                </h3>
                <p className="text-[#d0c5af] text-sm font-light leading-loose">
                  We source exclusively from mines that adhere to the highest ethical standards.
                  Every diamond is a testament to integrity.
                </p>
              </div>

              <div className="aspect-square overflow-hidden rounded-sm">
                <Image src={assets.about_us_tools} alt="Jewelry tools" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Our Vision */}
      <section className="py-12  flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#f2ca50] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-[#f2ca50]/20 rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl text-center px-6">
          <svg
            className="w-12 h-12 text-[#f2ca50] mx-auto mb-8"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          <h2 className="font-['Noto_Serif'] text-3xl md:text-5xl lg:text-6xl text-shazi-black leading-tight mb-12">
            "To redefine luxury as an{' '}
            <span className="italic text-[#f2ca50]">intimate connection</span> between the wearer
            and the art of time."
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-3">
              <p className="text-[#f2ca50] font-['Noto_Serif'] text-lg">Purity</p>
              <p className="text-[10px] uppercase tracking-widest text-shazi-black">
                Only the finest metals and gems.
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-[#f2ca50] font-['Noto_Serif'] text-lg">Heritage</p>
              <p className="text-[10px] uppercase tracking-widest text-shazi-black">
                Preserving ancestral techniques.
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-[#f2ca50] font-['Noto_Serif'] text-lg">Tomorrow</p>
              <p className="text-[10px] uppercase tracking-widest text-shazi-black">
                Sustainable luxury for the future.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>

  );
}