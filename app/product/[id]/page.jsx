import axiosInstance from '@/app/api/axiosInstance';
import ProductClient from "@/components/ProductClient";
import axios from "axios";

const ProductPage = async ({ params }) => {
    const { id } = await  params;

    try {
        const { data } = await axios.get(`${process.env.BASE_URL}/products/${id}`);
        if (!data.status || !data.data) {
            return <div>Product not found</div>;
        }

        return <ProductClient initialProduct={data.data.product} relatedProducts={data.data.related_products} />;
    } catch (err) {
        return <div>Failed to load product</div>;
    }
};

export default ProductPage;
