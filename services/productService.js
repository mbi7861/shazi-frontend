import axiosInstance from '@/app/api/axiosInstance';
import axios from 'axios';

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
      }
      return {
        success: false, data: null, message: data.message, errors: data.errors || {}
      };
    } catch (error) {
      console.error("Get Products Error:", error);
      return { success: false, message: "Something Went Wrong", errors: {} };
    }
  },

  async fetchRelatedProducts(slug) {
    try {
      const { data } = await axios.get(`${apiServiceConfig.baseURL}/related-products/${slug}`);
      if (data.status) {
        return {
          success: true, data: data.data
        };
      }
      return {
        success: false, data: null, message: data.message, errors: data.errors || {}
      };
    } catch (error) {
      console.error("Get Products Error:", error);
      return { success: false, message: "Something Went Wrong", errors: {} };
    }
  },

  async fetchProductsForSitemap() {
    try {
      const { data } = await axiosInstance.get(`/sitemap-products`);
      if (data.status) {
        return {
          success: true, data: data.data
        };
      }
      return {
        success: false, data: null, message: data.message, errors: data.errors || {}
      };
    } catch (error) {
      console.error("Get Products Error:", error);
      return { success: false, message: "Something Went Wrong", errors: {} };
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
        return { success: true, data: data.data };
      }
      return {
        success: false, data: null, message: data.message, errors: data.errors || {}
      };
    } catch (error) {
      console.error("Get Categories Error:", error);
      return { success: false, message: "Something Went Wrong", errors: {} };
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
