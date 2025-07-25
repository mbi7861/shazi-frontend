'use client';
import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {

    const { products, router } = useAppContext()
    return (
        <div className="flex flex-col items-center pt-14">
            <div className="flex items-center justify-between mb-4 w-full">
                <h3 className="text-2xl font-medium text-left ">Popular products</h3>
                <a
                    onClick={() => { router.push('/all-products') }}
                    className="text-sm border-b border-[#eb492f] text-gray-800 hover:text-[#eb492f]"
                >
                    View all
                </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
                {products.map((product, index) => <ProductCard key={index} product={product} />)}
            </div>
            {/*<button onClick={() => { router.push('/all-products') }} className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">*/}
            {/*    See more*/}
            {/*</button>*/}
        </div>
    );
};

export default HomeProducts;
