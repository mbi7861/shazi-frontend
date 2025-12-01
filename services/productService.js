import axiosInstance from '@/app/api/axiosInstance';

/**
 * Product Service
 * Handles all product-related API calls
 */
export const productService = {
  /**
   * Fetch products with optional filters
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Object>} - Products data or throws error
   */
  async fetchProducts(filters = {}) {
        try {
      const params = new URLSearchParams(filters).toString();
      const { data } = await axiosInstance.get(`/products?${params}`);
      
      if (data.status) {
        return {
          products: data.data.products,
          pagination: data.data.pagination || null
        };
      } else {
        throw new Error(data.message || 'Failed to load products');
      }
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message || 'Error fetching products');
    }
  },

  /**
   * Fetch categories
   * @returns {Promise<Array>} - Categories data or throws error
   */
  async fetchCategories() {
    try {
      const { data } = await axiosInstance.get('/categories');
      
      if (data.status) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to load categories');
      }
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message || 'Error fetching categories');
    }
  },

  /**
   * Fetch single product by ID
   * @param {string|number} productId - Product ID
   * @returns {Promise<Object>} - Product data or throws error
   */
  async fetchProductById(productId) {
    try {
      const { data } = await axiosInstance.get(`/products/${productId}`);
      
      if (data.status) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to load product');
      }
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message || 'Error fetching product');
    }
  },

  /**
   * Search products
   * @param {string} query - Search query
   * @param {Object} filters - Additional filters
   * @returns {Promise<Object>} - Search results or throws error
   */
  async searchProducts(query, filters = {}) {
    try {
      const searchFilters = { ...filters, search: query };
      return await this.fetchProducts(searchFilters);
    } catch (error) {
      throw new Error(error.message || 'Error searching products');
    }
  }
};
