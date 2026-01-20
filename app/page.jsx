import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhyShopWithUs from "@/components/WhyShopWithUs";
import HomeCategories from "@/components/HomeCategories";
import { fetchProductsSSR, fetchCategoriesSSR, getFeaturedProducts } from "@/lib/serverApi";
import { apiServiceConfig } from "@/app/config/apiService";

// SEO Metadata
export const metadata = {
  title: "Dilawar Traders - Your Trusted Online Shopping Destination",
  description: "Discover a wide range of quality products at Dilawar Traders. Shop breakers, lights, heaters, and other electrical home supplies with fast delivery and secure checkout. Your safety is our best priority.",
  keywords: "online shopping, ecommerce, electronics, fashion, home essentials, Dilawar Traders, quality products, fast delivery",
  authors: [{ name: "Dilawar Traders" }],
  openGraph: {
    title: "Dilawar Traders - Your Trusted Online Shopping Destination",
    description: "Discover a wide range of quality products at Dilawar Traders. Shop electronics, fashion, home essentials, and more.",
    type: "website",
    locale: "en_US",
    siteName: "Dilawar Traders",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dilawar Traders - Your Trusted Online Shopping Destination",
    description: "Discover a wide range of quality products at Dilawar Traders.",
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
    const featuredProducts = getFeaturedProducts(products);

    // Generate structured data for SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Store",
        "name": "Dilawar Traders",
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

    // Product structured data
    const productStructuredData = products.slice(0, 5).map(product => {
        const defaultItem = product.product_items?.find(item => item.is_default) || product.product_items?.[0];
        const price = defaultItem?.price?.discounted_price || defaultItem?.price?.price || 0;
        const imageUUID = product.primary_image || product.images?.[0]?.uuid;
        const imageBaseUrl = apiServiceConfig.imageBaseUrl;
        const imageUrl = imageUUID 
            ? `${imageBaseUrl}/products/${imageUUID}`
            : '';

        return {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.title,
            "description": product.small_description || product.title,
            "image": imageUrl,
            "offers": {
                "@type": "Offer",
                "price": price,
                "priceCurrency": process.env.NEXT_PUBLIC_CURRENCY || "PKR",
                "availability": "https://schema.org/InStock",
                "url": `${apiServiceConfig.siteUrl}/product/${product.slug}`
            }
        };
    });

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            {productStructuredData.map((data, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
                />
            ))}
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32">
                <HeaderSlider featuredProducts={featuredProducts} />
                <HomeProducts products={products} />
                <HomeCategories categories={categories} />
                {/* <FeaturedProduct /> */}
                <Banner />
                <WhyShopWithUs />
                {/*<NewsLetter />*/}
            </div>
            <Footer />
        </>
    );
}
