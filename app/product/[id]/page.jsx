import ProductView from "./ProductView";
import { notFound } from "next/navigation";
import { getImageUrl, resolveImageUUID } from "@/app/utils/utils";
import { fetchProductSSR } from "@/lib/serverApi";

export const revalidate = 60;

export async function generateMetadata({ params }) {
    const { id } = await params;

    const result = await fetchProductSSR(id, { next: { revalidate: 60 } });

    if (!result.success) {
        return {
            title: "Product Not Found",
            description: "This product could not be found.",
        };
    }

    const product = result.data;
    const plainTextDescription = product.description?.replace(/<[^>]+>/g, '').substring(0, 160) || "Explore our handcrafted jewellery collection.";

    // Find main image
    const mainImage = resolveImageUUID(product.primary_image, product.images);
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
}

const ProductPage = async ({ params }) => {
    const { id } = await params;

    const result = await fetchProductSSR(id, { next: { revalidate: 60 } });

    if (!result.success) {
        notFound();
    }

    return (
        <ProductView
            initialProduct={result.data}
        />
    );
};

export default ProductPage;
