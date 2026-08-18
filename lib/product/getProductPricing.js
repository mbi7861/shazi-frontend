/**
 * Extracts display pricing from a product item (or any object carrying a
 * `.price` from the API — discounted_price, price, discount_value).
 * @param {Object} item - A product item (or similarly-shaped price holder)
 * @returns {{ price: number, originalPrice: number|undefined, hasDiscount: boolean }}
 */
export const getProductPricing = (item) => {
    return {
        price: item?.price?.discounted_price || 0,
        originalPrice: item?.price?.price,
        hasDiscount: item?.price?.discount_value != null,
    };
};
