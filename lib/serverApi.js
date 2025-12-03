import axios from 'axios';

/**
 * Server-side API service for SSR
 * This doesn't use cookies or client-side features
 */
const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LARAVEL_API_URL || process.env.NEXT_PUBLIC_API_SERVICE_URL || process.env.BASE_URL || 'http://localhost/infinite-cart/public/api',
  timeout: 10000,
});

/**
 * Fetch products server-side
 * @param {Object} filters - Filter parameters
 * @returns {Promise<Object>} - Products data
 */
export async function fetchProductsSSR(filters = {}) {
  try {
    const params = new URLSearchParams(filters).toString();
    const { data } = await serverApi.get(`/products?${params}`);
    
    if (data.status) {
      return {
        products: data.data.products || [],
        pagination: data.data.pagination || null
      };
    } else {
      throw new Error(data.message || 'Failed to load products');
    }
  } catch (error) {
    console.error('Error fetching products SSR:', error);
    return {
      products: [],
      pagination: null
    };
  }
}

/**
 * Fetch categories server-side
 * @returns {Promise<Array>} - Categories data
 */
export async function fetchCategoriesSSR() {
  try {
    const { data } = await serverApi.get('/categories');
    
    if (data.status) {
      return data.data || [];
    } else {
      throw new Error(data.message || 'Failed to load categories');
    }
  } catch (error) {
    console.error('Error fetching categories SSR:', error);
    return [];
  }
}

/**
 * Get featured products from products array
 * @param {Array} products - Products array
 * @returns {Array} - Featured products
 */
export function getFeaturedProducts(products = []) {
  return products.filter(product => product.is_feature === 1);
}

