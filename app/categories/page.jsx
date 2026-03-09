import { fetchCategoriesSSR } from "@/lib/serverApi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryGrid from "@/components/CategoryGrid";
export const metadata = {
  title: "Shop by Categories - Dilawar Traders",
  description: "Browse all product categories at Dilawar Traders. Find electronics, fashion, home essentials, and more organized by category.",
  keywords: "categories, product categories, shop by category, browse products, Dilawar Traders",
  openGraph: {
    title: "Shop by Categories - Dilawar Traders",
    description: "Browse all product categories at Dilawar Traders.",
    type: "website",
  },
};

export default async function CategoriesPage() {
    const {data} = await fetchCategoriesSSR();

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 py-12">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-2">
                        Shop by Categories
                    </h1>
                    <div className="w-24 h-0.5 bg-orange-600 rounded-full"></div>
                    <p className="text-gray-600 mt-4 text-center max-w-2xl">
                        Browse our wide range of products organized by category. Find exactly what you're looking for.
                    </p>
                </div>

                <CategoryGrid categories={data} />
            </div>
            <Footer />
        </>
    );
}

