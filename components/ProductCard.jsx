import React from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import { useAppContext } from '@/context/AppContext';
import DOMPurify from 'dompurify';

const ProductCard = ({ product }) => {
    const { currency, router } = useAppContext();

    const offerPrice = product.prices[0].discounted_price
    const imageUUID = product.primary_image || product.images?.[0]?.uuid;
    const imageUrl = imageUUID
        ? `http://localhost/infinite-cart/public/storage/products/${imageUUID}` : '';
    return (
        <div
            onClick={() => {
                router.push('/product/' + product.slug);
                scrollTo(0, 0);
            }}
            className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
        >
            <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
                <Image
                    src={imageUrl}
                    alt={product.title}
                    className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
                    width={800}
                    height={800}
                    loading={'eager'}
                />
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                    <Image
                        className="h-3 w-3"
                        src={assets.heart_icon}
                        alt="heart_icon"
                    />
                </button>
            </div>

            <p className="md:text-base font-medium pt-2 w-full truncate">{product.title}</p>
            <div
                className="w-full text-xs text-gray-500/70 max-sm:hidden truncate"
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product.small_description),
                }}
            />
            <div className="flex items-center gap-2">
                <p className="text-xs">{4.5}</p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Image
                            key={index}
                            className="h-3 w-3"
                            src={
                                index < Math.floor(4.5)
                                    ? assets.star_icon
                                    : assets.star_dull_icon
                            }
                            alt="star_icon"
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-medium">
                    ${product.prices[0].discounted_price}
                    {product.prices[0].discount_value && (
                        <span className="text-base font-normal text-gray-800/60 line-through ml-2">
            ${product.prices[0].price}
        </span>
                    )}
                </p>

                <button className="max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
                    Buy now
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
