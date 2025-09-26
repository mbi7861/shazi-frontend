import axiosInstance from '@/app/api/axiosInstance';

/**
 * Order Service
 * Handles all order-related API calls
 */
export const orderService = {
  /**
   * Create new order
   * @param {Object} orderData - Order data
   * @returns {Promise<Object>} - Order response or throws error
   */
  async createOrder(orderData) {
    try {
      const { data } = await axiosInstance.post('/orders', orderData);
      
      if (data.status) {
        return data.data;
      } else {
        throw new Error(data.message || 'Order creation failed');
      }
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message || 'Order creation error');
    }
  },

  /**
   * Fetch user orders
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Object>} - Orders data or throws error
   */
  async fetchOrders(filters = {}) {
    try {
      const params = new URLSearchParams(filters).toString();
      const { data } = await axiosInstance.get(`/orders?${params}`);
      
      if (data.status) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to load orders');
      }
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message || 'Error fetching orders');
    }
  },

  /**
   * Fetch single order by ID
   * @param {string|number} orderId - Order ID
   * @returns {Promise<Object>} - Order data or throws error
   */
  async fetchOrderById(orderId) {
    try {
      const { data } = await axiosInstance.get(`/orders/${orderId}`);
      
      if (data.status) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to load order');
      }
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message || 'Error fetching order');
    }
  },

  /**
   * Cancel order
   * @param {string|number} orderId - Order ID
   * @returns {Promise<Object>} - Cancel response or throws error
   */
  async cancelOrder(orderId) {
    try {
      const { data } = await axiosInstance.post(`/orders/${orderId}/cancel`);
      
      if (data.status) {
        return data.data;
      } else {
        throw new Error(data.message || 'Order cancellation failed');
      }
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message || 'Order cancellation error');
    }
  },

  /**
   * Track order
   * @param {string|number} orderId - Order ID
   * @returns {Promise<Object>} - Tracking data or throws error
   */
  async trackOrder(orderId) {
    try {
      const { data } = await axiosInstance.get(`/orders/${orderId}/track`);
      
      if (data.status) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to track order');
      }
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message || 'Order tracking error');
    }
  }
};
