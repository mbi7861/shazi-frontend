'use client';

import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { productService } from '@/services';
import toast from 'react-hot-toast';

// Create Product Context with default values
export const ProductContext = createContext({
  products: [],
  categories: [],
  isLoading: false,
  filters: {},  
  pagination: null,
  fetchProducts: async () => {},
  fetchCategories: async () => {},
  searchProducts: async () => {},
  setFilters: () => {},
  clearFilters: () => {},
});

// Custom hook to use Product Context
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

// Product Provider Component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState(null);

  // Fetch products with filters
  const fetchProducts = useCallback(async (newFilters = {}) => {
    setIsLoading(true);
    try {
      const mergedFilters = { ...filters, ...newFilters };
      const response = await productService.fetchProducts(mergedFilters);

      setProducts(response.products);
      setPagination(response.pagination);
      setFilters(mergedFilters);

      return response;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const categoriesData = await productService.fetchCategories();
      setCategories(categoriesData.data);
      return categoriesData;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }, []);


  // Search products
  const searchProducts = useCallback(async (query, searchFilters = {}) => {
    setIsLoading(true);
    try {
      const response = await productService.searchProducts(query, searchFilters);

      setProducts(response.products);
      setPagination(response.pagination);

      return response;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Get featured products
  const getFeaturedProducts = useCallback(() => {
    return products.filter(product => product.is_feature === 1);
  }, [products]);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Load products with default filters
        await fetchProducts({ per_page: 5 });
        // Load categories
        await fetchCategories();
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };

    loadInitialData();
    // Intentionally run once on mount only — fetchProducts/fetchCategories
    // are stable enough here and re-running on every filters change would
    // refetch the initial page unexpectedly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Memoized context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    products,
    categories,
    isLoading,
    filters,
    pagination,
    fetchProducts,
    fetchCategories,
    searchProducts,
    setFilters: updateFilters,
    clearFilters,
    getFeaturedProducts,
  }), [
    products,
    categories,
    isLoading,
    filters,
    pagination,
    fetchProducts,
    fetchCategories,
    searchProducts,
    updateFilters,
    clearFilters,
    getFeaturedProducts,
  ]);

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
