import axiosInstance from '@/app/api/axiosInstance';

export const addressServices = {
  async getAddresses() {
    try {
      const { data } = await axiosInstance.get("/addresses");

    if (data.s) {
      return data.d || [];
    }

    throw new Error(data.message || "Failed to load addresses.");
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return [];
  }
},

/**
 * Add new address
 */
  async addAddress(addressData) {
    try {
      const { data } = await axiosInstance.post("/addresses", addressData);
      return data;
    } catch (error) {
      console.error("Add Address Error:", error);
      return error.response.data;
    }
},

/**
 * Update existing address
 */
  async updateAddress(addressId, updatedData) {
  try {
    const { data } = await axiosInstance.put(`/addresses/${addressId}`, updatedData);
    return data;
  } catch (error) {
    console.error("Update Address Error:", error);
    return error.response.data;
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
