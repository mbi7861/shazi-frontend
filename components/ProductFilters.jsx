'use client';

import React, { useState, useEffect } from 'react';
import { assets } from '@/assets/assets';
import Image from 'next/image';

const ProductFilters = ({ 
    filters, 
    setFilters, 
    categories, 
    onFilterChange,
    priceRange,
    setPriceRange 
}) => {
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        categories: true,
        price: true,
        sort: true
    });

    const sortOptions = [
        { value: '', label: 'Latest' },
        { value: 'price_asc', label: 'Price: Low to High' },
        { value: 'price_desc', label: 'Price: High to Low' },
        { value: 'best_selling', label: 'Best Selling' }
    ];

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handlePriceChange = (type, value) => {
        const newPriceRange = { ...priceRange, [type]: value };
        setPriceRange(newPriceRange);
        
        // Update filters with new price range
        const newFilters = { 
            ...filters, 
            min_price: newPriceRange.min || '', 
            max_price: newPriceRange.max || '' 
        };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearAllFilters = () => {
        const clearedFilters = { per_page: 15 };
        setFilters(clearedFilters);
        setPriceRange({ min: '', max: '' });
        onFilterChange(clearedFilters);
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <>
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
                <button
                    onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white"
                >
                    <Image src={assets.filter_icon || "/filter-icon.svg"} alt="Filter" width={20} height={20} />
                    Filters
                    <span className="ml-auto text-sm text-gray-500">
                        {Object.keys(filters).filter(key => key !== 'per_page' && filters[key]).length} active
                    </span>
                </button>
            </div>

            {/* Filter Sidebar */}
            <div className={`
                ${isMobileFiltersOpen ? 'block' : 'hidden'} 
                lg:block lg:w-64 lg:flex-shrink-0
                bg-white border border-gray-200 rounded-lg p-6 mb-6 lg:mb-0
            `}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                    <button
                        onClick={clearAllFilters}
                        className="text-sm text-orange-600 hover:text-orange-700"
                    >
                        Clear all
                    </button>
                </div>

                {/* Categories Filter */}
                <div className="border-b border-gray-200 pb-6 mb-6">
                    <button
                        onClick={() => toggleSection('categories')}
                        className="flex items-center justify-between w-full text-left mb-4"
                    >
                        <h4 className="font-medium text-gray-900">Categories</h4>
                        {/* <Image
                            src={assets.arrow_down_icon || "/arrow-down.svg"}
                            alt="Toggle"
                            width={16}
                            height={16}
                            className={`transform transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`}
                        /> */}
                    </button>
                    
                    {expandedSections.categories && (
                        <div className="space-y-3">
                            {categories?.map((category) => (
                                <label key={category.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={filters.category === category.slug}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                handleFilterChange('category', category.slug);
                                            } else {
                                                handleFilterChange('category', '');
                                            }
                                        }}
                                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                    />
                                    <span className="ml-3 text-sm text-gray-700">
                                        {category.title} ({category.products_count || 0})
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Price Range Filter */}
                <div className="border-b border-gray-200 pb-6 mb-6">
                    <button
                        onClick={() => toggleSection('price')}
                        className="flex items-center justify-between w-full text-left mb-4"
                    >
                        <h4 className="font-medium text-gray-900">Price Range</h4>
                        {/* <Image
                            src={assets.arrow_down_icon || "/arrow-down.svg"}
                            alt="Toggle"
                            width={16}
                            height={16}
                            className={`transform transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
                        /> */}
                    </button>
                    
                    {expandedSections.price && (
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="block text-sm text-gray-600 mb-1">Min Price</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={priceRange.min}
                                        onChange={(e) => handlePriceChange('min', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm text-gray-600 mb-1">Max Price</label>
                                    <input
                                        type="number"
                                        placeholder="10000"
                                        value={priceRange.max}
                                        onChange={(e) => handlePriceChange('max', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sort By Filter */}
                <div className="border-b border-gray-200 pb-6 mb-6">
                    <button
                        onClick={() => toggleSection('sort')}
                        className="flex items-center justify-between w-full text-left mb-4"
                    >
                        <h4 className="font-medium text-gray-900">Sort By</h4>
                        {/* <Image
                            src={assets.arrow_down_icon || "/arrow-down.svg"}
                            alt="Toggle"
                            width={16}
                            height={16}
                            className={`transform transition-transform ${expandedSections.sort ? 'rotate-180' : ''}`}
                        /> */}
                    </button>
                    
                    {expandedSections.sort && (
                        <div className="space-y-3">
                            {sortOptions.map((option) => (
                                <label key={option.value} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="sortBy"
                                        value={option.value}
                                        checked={filters.sortBy === option.value}
                                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                                    />
                                    <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Results Per Page */}
                <div className="pb-6">
                    <h4 className="font-medium text-gray-900 mb-4">Results Per Page</h4>
                    <select
                        value={filters.per_page || 15}
                        onChange={(e) => handleFilterChange('per_page', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                        <option value={8}>8 per page</option>
                        <option value={15}>15 per page</option>
                        <option value={20}>20 per page</option>
                        <option value={30}>30 per page</option>
                    </select>
                </div>

                {/* Active Filters Display */}
                {Object.keys(filters).filter(key => key !== 'per_page' && filters[key]).length > 0 && (
                    <div className="pt-4 border-t border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-3">Active Filters</h4>
                        <div className="space-y-2">
                            {filters.category && (
                                <div className="flex items-center justify-between bg-orange-50 px-3 py-2 rounded-md">
                                    <span className="text-sm text-orange-800">Category: {filters.category}</span>
                                    <button
                                        onClick={() => handleFilterChange('category', '')}
                                        className="text-orange-600 hover:text-orange-700"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                            {filters.min_price && (
                                <div className="flex items-center justify-between bg-orange-50 px-3 py-2 rounded-md">
                                    <span className="text-sm text-orange-800">Min Price: ${filters.min_price}</span>
                                    <button
                                        onClick={() => handlePriceChange('min', '')}
                                        className="text-orange-600 hover:text-orange-700"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                            {filters.max_price && (
                                <div className="flex items-center justify-between bg-orange-50 px-3 py-2 rounded-md">
                                    <span className="text-sm text-orange-800">Max Price: ${filters.max_price}</span>
                                    <button
                                        onClick={() => handlePriceChange('max', '')}
                                        className="text-orange-600 hover:text-orange-700"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                            {filters.sortBy && (
                                <div className="flex items-center justify-between bg-orange-50 px-3 py-2 rounded-md">
                                    <span className="text-sm text-orange-800">Sort: {sortOptions.find(opt => opt.value === filters.sortBy)?.label}</span>
                                    <button
                                        onClick={() => handleFilterChange('sortBy', '')}
                                        className="text-orange-600 hover:text-orange-700"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductFilters;
