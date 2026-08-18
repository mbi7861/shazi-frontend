import ProductView from "./ProductView";
import { notFound } from "next/navigation";
import { apiServiceConfig, getApiServiceUrl } from "@/app/config/apiService";
import { getImageUrl } from "@/app/utils/utils";

export const revalidate = 60;

export async function generateMetadata({ params }) {
    const { id } = await params;

    try {
        const productUrl = getApiServiceUrl(`${apiServiceConfig.endpoints.products}/${id}`);
        const response = await fetch(productUrl, { next: { revalidate: 60 } });
        const data = await response.json();

        if (!data.status || !data.data) {
            return {
                title: "Product Not Found",
                description: "This product could not be found.",
            };
        }

        const product = data.data;
        const plainTextDescription = product.description?.replace(/<[^>]+>/g, '').substring(0, 160) || "Explore our handcrafted jewellery collection.";

        // Find main image
        const mainImage = product.primary_image || product.images?.find((img) => img.is_preview)?.uuid || product.images?.[0]?.uuid;
        const imageUrl = mainImage ? getImageUrl(mainImage) : null;

        return {
            title: `${product.title} - Shazi Jewels`,
            description: plainTextDescription,
            openGraph: {
                title: `${product.title} - Shazi Jewels`,
                description: plainTextDescription,
                type: 'website',
                images: imageUrl ? [{ url: imageUrl }] : [],
            },
            twitter: {
                card: 'summary_large_image',
                title: `${product.title} - Shazi Jewels`,
                description: plainTextDescription,
                images: imageUrl ? [imageUrl] : [],
            }
        };
    } catch (err) {
        return {
            title: "Product",
            description: "View product details at Shazi Jewels",
        };
    }
}

const ProductPage = async ({ params }) => {
    const { id } = await params;

    let data;
    try {
        const productUrl = getApiServiceUrl(`${apiServiceConfig.endpoints.products}/${id}`);
        const response = await fetch(productUrl, { next: { revalidate: 60 } });
        data = await response.json();
    } catch (err) {
        console.error("Server Error:", err.message);
        notFound();
    }

    if (!data.status) {
        notFound();
    }

    return (
        <ProductView
            initialProduct={data.data}
        />
    );
};

export default ProductPage;
