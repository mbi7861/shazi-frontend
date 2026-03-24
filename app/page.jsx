import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhyShopWithUs from "@/components/WhyShopWithUs";
import HeroSection from "@/components/HeroSection";
import { fetchProductsSSR, fetchCategoriesSSR, getFeaturedProducts } from "@/lib/serverApi";
import { apiServiceConfig } from "@/app/config/apiService";
import HomeCollections from "@/components/home/HomeCollection";
import BrandStory from "@/components/home/HomeStory";

// SEO Metadata
export const metadata = {
  title: "Shazi Jewels - Your Trusted Online Shopping Destination",
  description: "Discover a wide range of quality products at Shazi Jewels. Shop breakers, lights, heaters, and other electrical home supplies with fast delivery and secure checkout. Your safety is our best priority.",
  keywords: "online shopping, ecommerce, electronics, fashion, home essentials, Shazi Jewels, quality products, fast delivery",
  authors: [{ name: "Shazi Jewels" }],
  openGraph: {
    title: "Shazi Jewels - Your Trusted Online Shopping Destination",
    description: "Discover a wide range of quality products at Shazi Jewels. Shop electronics, fashion, home essentials, and more.",
    type: "website",
    locale: "en_US",
    siteName: "Shazi Jewels",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shazi Jewels - Your Trusted Online Shopping Destination",
    description: "Discover a wide range of quality products at Shazi Jewels.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: apiServiceConfig.siteUrl,
  },
};

export default async function Home() {
    // Fetch data server-side for SSR
    const [productsData, categories] = await Promise.all([
        fetchProductsSSR({ per_page: 5 }),
        fetchCategoriesSSR(),
    ]);

    const products = productsData.products || [];

    // Generate structured data for SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Store",
        "name": "Shazi Jewels",
        "description": "Your Trusted Online Shopping Destination",
        "url": apiServiceConfig.siteUrl,
        "logo": `${apiServiceConfig.siteUrl}/logo.svg`,
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "PK"
        },
        "sameAs": [
            // Add your social media links here
        ],
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${apiServiceConfig.siteUrl}/all-products?search={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    };


    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <Navbar />
            <HeroSection />
            <div className="px-6 md:px-16 lg:px-16">
                <HomeCollections categories={categories.data} />
                <HomeProducts products={products} />
                {/* <Banner /> */}
                <BrandStory/>
                {/* <WhyShopWithUs /> */}
            </div>
            <Footer />
        </>
    );
}
