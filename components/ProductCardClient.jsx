'use client';

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProductCardClient({ product }) {
    const { addToCart, cartItems } = useCart();
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        const isInCart = cartItems.some((item) => item.id === product.id);
        if (isInCart) {
            toast.error("Product is already in cart");
            return;
        }
        addToCart(product);
        toast.success("Product added to cart");
    };

    return (
        <div
            onClick={() => router.push(`/product/${product.slug}`)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex flex-col items-center gap-2 cursor-pointer group"
        >
            <div className="relative w-full aspect-square overflow-hidden rounded-lg">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {isHovered && (
                    <button
                        onClick={handleAddToCart}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                        Add to Cart
                    </button>
                )}
            </div>
            <div className="flex flex-col items-center gap-1">
                <p className="text-sm font-medium text-gray-800">{product.name}</p>
                <p className="text-sm text-gray-500">${product.price}</p>
            </div>
        </div>
    );
} 