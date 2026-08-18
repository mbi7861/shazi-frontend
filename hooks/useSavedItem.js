'use client';

import { useCart } from '@/context/CartContext';

/**
 * Wishlist ("save for later") toggle for a single product item.
 * @param {Object} item - The product item to save/unsave
 * @param {Object} productData - The parent product, attached when saving
 * @returns {{ isSaved: boolean, toggle: () => void }}
 */
export const useSavedItem = (item, productData) => {
    const { saveItemForLater, removeFromSaved, savedItems } = useCart();

    const isSaved = savedItems.some((p) => p.id === item?.id);

    const toggle = () => {
        if (!item) return;
        if (isSaved) {
            removeFromSaved(item.id);
        } else {
            saveItemForLater({ ...item, product: productData });
        }
    };

    return { isSaved, toggle };
};
