import { fetchCategoriesSSR } from "@/lib/serverApi";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import CategoryGrid from "@/components/CategoryGrid";
export const metadata = {
    title: "Shop by Categories - Shazi Jewels",
    description: "Browse all product categories at Shazi Jewels. Find products organized by category.",
    keywords: "categories, product categories, shop by category, browse products, Shazi Jewels",
    openGraph: {
        title: "Shop by Categories - Shazi Jewels",
        description: "Browse all product categories at Shazi Jewels.",
        type: "website",
    },
};

export default async function CategoriesPage() {
    const { data } = await fetchCategoriesSSR();

    return (
        <>
            <Navbar />
            <PageHero title="Collections" />
            <div className="px-6 md:px-16 lg:px-32 py-12">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-2">
                        Shop by Collections
                    </h1>
                    <div className="w-24 h-0.5 bg-primary rounded-full"></div>
                    <p className="text-gray-600 mt-4 text-center max-w-2xl">
                        Discover our curated collections and find the perfect piece for every occasion.
                    </p>
                </div>

                <CategoryGrid categories={data} />
            </div>
            <Footer />
        </>
    );
}

