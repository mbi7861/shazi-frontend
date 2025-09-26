'use client';

import React, { useEffect, useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import ProductCard from './ProductCard';

/**
 * Example component demonstrating the new clean architecture
 * This shows how to use the separated contexts and services
 */
const ProductListingExample = () => {
  // Use the new context hooks
  const { 
    products, 
    categories, 
    isLoading, 
    fetchProducts, 
    searchProducts,
    setFilters,
    clearFilters 
  } = useProducts();
  
  const { addToCart, cartCount } = useCart();
  const { userData, isAuthenticated } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Load products on component mount
  useEffect(() => {
    fetchProducts({ per_page: 10 });
  }, []);

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await searchProducts(searchQuery.trim());
    } else {
      await fetchProducts({ per_page: 10 });
    }
  };

  // Handle category filter
  const handleCategoryFilter = async (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      await fetchProducts({ category_id: categoryId, per_page: 10 });
    } else {
      await fetchProducts({ per_page: 10 });
    }
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }
    addToCart(product);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    clearFilters();
    fetchProducts({ per_page: 10 });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Listing Example</h1>
      
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <form onSubmit={handleSearch} className="flex gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </form>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleCategoryFilter('')}
            className={`px-4 py-2 rounded-lg border ${
              selectedCategory === '' 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryFilter(category.id)}
              className={`px-4 py-2 rounded-lg border ${
                selectedCategory === category.id 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <button
          onClick={handleClearFilters}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Clear Filters
        </button>
      </div>

      {/* User Info */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600">
          {isAuthenticated ? (
            <>Welcome, {userData?.name || userData?.email}! Cart items: {cartCount}</>
          ) : (
            'Please login to add items to cart'
          )}
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading products...</p>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
              <ProductCard product={product} />
              <button
                onClick={() => handleAddToCart(product)}
                disabled={!isAuthenticated}
                className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                {isAuthenticated ? 'Add to Cart' : 'Login to Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found</p>
          <button
            onClick={handleClearFilters}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductListingExample;
