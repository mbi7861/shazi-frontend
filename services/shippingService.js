import axiosInstance from '@/app/api/axiosInstance';
import { apiServiceConfig } from '@/app/config/apiService';

export const shippingService = {
  async calculateShipping({ items, city, stateCode }) {
    try {
      const payload = {
        items,
        city,
        state_code: stateCode,
      };

      const { data } = await axiosInstance.post(
        apiServiceConfig.endpoints.shippingCalculate,
        payload
      );

      if (data?.status) {
        return { success: true, data };
      }

      return {
        success: false,
        message: data?.message || 'Failed to calculate shipping',
        errors: data?.errors || {},
      };
    } catch (error) {
      console.error('Calculate Shipping Error:', error);
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          error.message ||
          'Something went wrong',
        errors: error?.response?.data?.errors || {},
      };
    }
  },
};

