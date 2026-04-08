import axiosInstance from '@/app/api/axiosInstance';

/**
 * Contact Service
 * Handles contact form API calls
 */
export const contactService = {
  /**
   * Submit contact form
   * @param {Object} formData - { name, email, subject, message }
   * @returns {Promise<Object>} - Response data or throws error
   */
  async submitContact(formData) {
    try {
      const { data } = await axiosInstance.post('/contact-us', formData);

      if (data.status) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      throw new Error(
        error?.response?.data?.message || error.message || 'Contact submission error'
      );
    }
  },
};
