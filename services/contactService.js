import axiosInstance from '@/app/api/axiosInstance';

/**
 * Contact Service
 * Handles contact form API calls
 */
export const contactService = {
  /**
   * Submit contact form
   * @param {Object} formData - { name, email, subject, message }
   * @returns {Promise<Object>} - { success, data, message, errors }
   */
  async submitContact(formData) {
    try {
      const { data } = await axiosInstance.post('/contact-us', formData);

      if (data.status) {
        return { success: true, data: data.data, message: data.message };
      }
      return { success: false, data: null, message: data.message, errors: data.errors || {} };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error?.response?.data?.message || error.message || 'Contact submission error',
        errors: error?.response?.data?.errors || {},
      };
    }
  },
};
