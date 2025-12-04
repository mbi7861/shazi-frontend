import ProductView from "./ProductView";
import axios from "axios";

const ProductPage = async ({ params }) => {
    const { slug } = params; // no need for await

    try {
        const { data } = await axios.get(
            `${process.env.BASE_URL}/products/${slug}`,
            { next: { revalidate: 60 } } // optional: ISR caching
        );

        if (!data.status || !data.data?.product) {
            return <div>Product not found</div>;
        }

        return (
            <ProductView
                initialProduct={data.data.product}
                relatedProducts={data.data.related_products}
            />
        );
    } catch (err) {
        console.error("Server Error:", err.response?.data?.message || err.message);
        return <div>Failed to load product</div>;
    }
};

export default ProductPage;
