import ProductView from "./ProductView";
import axios from "axios";
import { apiServiceConfig, getApiServiceUrl } from "@/app/config/apiService";

export async function generateMetadata({ params }) {
    const { id } = await params;

    try {
        const productUrl = getApiServiceUrl(`${apiServiceConfig.endpoints.products}/${id}`);
        const { data } = await axios.get(productUrl);

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
        const imageUrl = mainImage ? `${apiServiceConfig.endpoints.imageUrl}/${mainImage}` : null;

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

    try {
        const productUrl = getApiServiceUrl(`${apiServiceConfig.endpoints.products}/${id}`);
        const { data } = await axios.get(
            productUrl,
            { next: { revalidate: 60 } }
        );

        if (!data.status) {
            return <div>Product not found</div>;
        }

        return (
            <ProductView
                initialProduct={data.data}
            />
        );
    } catch (err) {
        console.error("Server Error:", err.response?.data?.message || err.message);
        return <div>Failed to load product</div>;
    }
};

export default ProductPage;
