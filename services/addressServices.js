import axiosInstance from '@/app/api/axiosInstance';

export const addressServices = {
  async getAddresses() {
    try {
      const { data } = await axiosInstance.get("/addresses");

      if (data.status) {
        return { success: true, data: data.data };
      }

      console.error(data.message);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      if (error.response?.data) {
        return { success: false, error: error.response.data };
      }
      return { success: false, error: error.message };
    }
  },

/**
 * Add new address
 */
  async addAddress(addressData) {
    try {
      const { data } = await axiosInstance.post("/addresses", addressData);
      if (data.status) {
        return { success: true, data: data.data  };
      }
      return { success: false, ...data };
    } catch (error) {
      console.error("Add Address Error:", error);
      if (error.response?.data) {
        return { success: false, ...error.response.data };
      }
      return { success: false, message: error.message };
    }
},

/**
 * Update existing address
 */
  async updateAddress(addressId, updatedData) {
    try {
      const { data } = await axiosInstance.post(`/addresses/${addressId}`, updatedData);
      if (data.status) {
        return { success: true, data: data.data };
      }
      return { success: false, ...data };
    } catch (error) {
      console.error("Update Address Error:", error);
      if (error.response?.data) {
        return { success: false, ...error.response.data };
      }
      return { success: false, message: error.message };
    }
  },

/**
 * Delete address
 */
  async deleteAddress(addressId) {
  try {
    const { data } = await axiosInstance.delete(`/addresses/${addressId}`);
    return data;
  } catch (error) {
    console.error("Delete Address Error:", error);
    return error.response.data;
  }
},

/**
 * Mark address as default
 */
  async setDefaultAddress(addressId) {
  try {
    const { data } = await axiosInstance.post(`/addresses/${addressId}/default`);
    return data;
  } catch (error) {
    console.error("Set Default Address Error:", error);
    return error.response.data;
  }
}
}
