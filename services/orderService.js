import axiosInstance from '@/app/api/axiosInstance';
import { apiServiceConfig } from '@/app/config/apiService';

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
        const { data } = await axiosInstance.post(apiServiceConfig.endpoints.checkout, orderData);
        if (data.status) {
            return { success: true, data: data.data };
        }
        return {
            success: false, data: null, message: data.message, errors: data.errors || {}
        };
    } catch (error) {
        console.error("Add Address Error:", error);
        return { success: false, message: "Something Went Wrong", errors: {} };
    }
},

  /**
   * Fetch user orders
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Object>} - Orders data or throws error
   */
  async fetchOrders(filters = {}) {
    try {
      const { data } = await axiosInstance.get("/orders");
      if (data.status) {
        return { success: true, data: data.data };
      }
      return { success: false, data: null, message: data.message, errors: data.errors || {} };
    } catch (error) {
      console.error("Error fetching orders:", error);
      return { success: false, message: "Something Went Wrong", errors: {} };
    }
  },

  /**
   * Fetch single order by ID
   * @param {string|number} orderId - Order ID
   * @returns {Promise<Object>} - Order data or throws error
   */
  async getOrderById(orderId) {
    try {
        const endpoint = apiServiceConfig.endpoints.orderDetails.replace('{id}', orderId);
        const { data } = await axiosInstance.get(endpoint);
        if (data.status) {
            return { success: true, data: data.data };
        }
        return {
            success: false, data: null, message: data.message, errors: data.errors || {}
        };
    } catch (error) {
        console.error("Get Order Error:", error);
        return { success: false, message: "Something Went Wrong", errors: {} };
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
