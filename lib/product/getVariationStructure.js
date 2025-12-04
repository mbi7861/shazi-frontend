/**
 * Builds the variation structure from product items
 * @param {Array} productItems - Array of product items with variation_options
 * @returns {Array} Array of variation objects with variation_id, name, and options
 */
export const getVariationStructure = (productItems = []) => {
    if (!productItems || productItems.length === 0) {
        return [];
    }

    // Get unique variation IDs
    const variationIds = Array.from(
        new Set(
            productItems.flatMap(item => 
                item.variation_options?.map(opt => opt.variation_id) || []
            )
        )
    );

    // Build variations array with unique options for each variation_id
    const variations = variationIds.map(variationId => {
        const allOptionsForVariation = productItems.flatMap(item =>
            item.variation_options
                ?.filter(opt => opt.variation_id === variationId)
                .map(opt => opt.value) || []
        );
        
        const uniqueOptions = Array.from(new Set(allOptionsForVariation));
        
        return {
            variation_id: variationId,
            name: `Variation ${variationId}`,
            options: uniqueOptions,
        };
    });

    return variations;
};

