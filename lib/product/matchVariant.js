/**
 * Matches a product item based on selected variation options
 * @param {Array} productItems - Array of product items to search
 * @param {Object} selectedOptions - Object mapping variation_id to selected value
 * @returns {Object|null} The matched product item or null
 */
export const matchVariant = (items, selectedOptions) => {
    return items.find(item => {
        const optionIds = item.variation_options.map(v => v.id);
        return Object.values(selectedOptions).every(id => optionIds.includes(id));
    });
};


