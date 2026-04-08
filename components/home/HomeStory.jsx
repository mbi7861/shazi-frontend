import Link from 'next/link';

const BrandStory = () => {
    return (
        <section className="py-12 px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Left - Image */}
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800"
                        alt="Artisan crafting jewelry with precision"
                        className="w-full object-cover aspect-square"
                    />
                    {/* Small accent box bottom-left */}
                    <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-shazi-gold opacity-40" />
                </div>

                {/* Right - Content */}
                <div className="flex flex-col justify-center space-y-6">
                    {/* Tag */}
                    <span className="text-[10px] uppercase tracking-[0.3em] text-shazi-gold">
                        Our Ethos
                    </span>

                    {/* Heading */}
                    <h2 className="text-5xl md:text-6xl font-serif text-shazi-black leading-tight">
                        Crafted with Precision
                    </h2>

                    {/* Italic Quote */}
                    <p className="text-lg font-serif italic text-shazi-black/80 leading-relaxed">
                        The Art of Shazi is a silent dialogue between the artisan and
                        the earth. It is where raw metal meets the patience of a steady
                        hand, and where light finds its perfect rhythm within the facets
                        of a stone.
                    </p>

                    {/* Body Text */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Every curve is intentional, every setting a testament to a legacy
                        of refinement. We do not merely create jewelry; we capture fleeting
                        moments of beauty and cast them in eternal form. Each piece is a
                        singular journey from a whisper of inspiration to a masterpiece of
                        hand-forged excellence.
                    </p>

                    {/* CTA Link */}
                    <div className="pt-4">
                        <Link
                            href="/about-us"
                            className="text-xs uppercase tracking-widest border-b border-shazi-gold pb-1 hover:text-shazi-gold transition-colors inline-block"
                        >
                            Explore The Process
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default BrandStory;