/**
 * Gets the default product item from a product's product_items array
 * @param {Array} productItems - Array of product items
 * @returns {Object|null} The default product item or the first item, or null if no items
 */
export const getDefaultProductItem = (productItems = []) => {
    if (!productItems || productItems.length === 0) {
        return null;
    }
    return productItems.find(item => item.is_default) || productItems[0];
};

