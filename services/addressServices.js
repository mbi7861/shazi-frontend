import axiosInstance from '@/app/api/axiosInstance';

export const addressServices = {
  async getAddresses() {
    try {
      const { data } = await axiosInstance.get("/addresses");
      if (data.status) {
        return { success: true, data: data.data };
      }
      return { success: false, data: null, message: data.message, errors: data.errors || {} };
    } catch (error) {
      console.error("Error fetching addresses:", error);
      return { success: false, message: "Something Went Wrong", errors: {} };
    }
  },

  /**
   * Add new address
   */
  async addAddress(addressData) {
    try {
      const { data } = await axiosInstance.post("/addresses", addressData);
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
   * Update existing address
   */
  async updateAddress(addressId, updatedData) {
    try {
      const { data } = await axiosInstance.post(`/addresses/${addressId}`, updatedData);
      if (data.status) {
        return { success: true, data: data.data };
      }
      return {success: false, data: null, message: data.message, errors: data.errors || {}};
    } catch (error) {
      console.error("Update Address Error:", error);
      return { success: false, message: "Something Went Wrong", errors: {} };
    }
  },


  /**
   * Delete address
   */
  async deleteAddress(addressId) {
    try {
      const { data } = await axiosInstance.delete(`/addresses/${addressId}`);
      if (data.status) {
        return { success: true, data: data.data };
      }
      return {success: false, data: null, message: data.message, errors: data.errors || {}};
    } catch (error) {
      console.error("Delete Address Error:", error);
      return { success: false, message: "Something Went Wrong", errors: {} };
    }
  },

  /**
   * Mark address as default
   */
  async setDefaultAddress(addressId) {
    try {
      const { data } = await axiosInstance.post(`/addresses/${addressId}/default`);
      if (data.status) {
        return { success: true, data: data.data };
      }
      return { success: false, ...data, e_msg: data.message };
    } catch (error) {
      console.error("Set Default Address Error:", error);
      return { success: false, e_msg: "Something Went Wrong" };
    }
  }
}
