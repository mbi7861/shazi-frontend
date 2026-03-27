import ProductView from "./ProductView";
import axios from "axios";
import { apiServiceConfig, getApiServiceUrl } from "@/app/config/apiService";

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
