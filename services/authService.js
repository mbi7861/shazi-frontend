import axiosInstance from '@/app/api/axiosInstance';

/**
 * Normalizes a caught error (network failure or non-2xx response) into
 * the same { success, data, message, errors } shape every other service
 * method returns on failure — so callers only ever check `.success`,
 * never both a resolved failure object and a thrown error.
 */
const handleError = (error, fallbackMessage) => ({
  success: false,
  data: null,
  message: error?.response?.data?.message || error.message || fallbackMessage,
  errors: error?.response?.data?.errors || {},
});

/**
 * Auth Service
 * Handles all authentication-related API calls
 */
export const authService = {
  /**
   * Fetch current user data
   * @returns {Promise<Object>} - { success, data, message, errors }
   */
  async fetchUserData() {
    try {
      const { data } = await axiosInstance.get('/get-user');

      if (data.status) {
        return { success: true, data: data.data.user };
      }
      return { success: false, data: null, message: data.message, errors: data.errors || {} };
    } catch (error) {
      return handleError(error, 'User fetch error');
    }
  },

  /**
   * Login user
   * @param {Object} credentials - Login credentials
   * @returns {Promise<Object>} - { success, data, message, errors }
   */
  async login(credentials) {
    try {
      const { data } = await axiosInstance.post('auth/login', credentials);

      if (data.status) {
        return { success: true, data: data.data };
      }
      return { success: false, data: null, message: data.message, errors: data.errors || {} };
    } catch (error) {
      return handleError(error, 'Login error');
    }
  },

  /**
   * Register user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} - { success, data, message, errors }
   */
  async register(userData) {
    try {
      const { data } = await axiosInstance.post('auth/register', userData);

      if (data.status) {
        return { success: true, data: data.data };
      }
      return { success: false, data: null, message: data.message, errors: data.errors || {} };
    } catch (error) {
      return handleError(error, 'Registration error');
    }
  },

  /**
   * Logout user
   * @returns {Promise<Object>} - { success, data, message, errors }
   */
  async logout() {
    try {
      const { data } = await axiosInstance.post('auth/logout');

      if (data.status) {
        return { success: true, data: data.data };
      }
      return { success: false, data: null, message: data.message, errors: data.errors || {} };
    } catch (error) {
      return handleError(error, 'Logout error');
    }
  },

  /**
   * Update user profile
   * @param {Object} userData - Updated user data
   * @returns {Promise<Object>} - { success, data, message, errors }
   */
  async updateProfile(userData) {
    try {
      const { data } = await axiosInstance.put('/user/profile', userData);

      if (data.status) {
        return { success: true, data: data.data };
      }
      return { success: false, data: null, message: data.message, errors: data.errors || {} };
    } catch (error) {
      return handleError(error, 'Profile update error');
    }
  },

  /**
   * Change password
   * @param {Object} passwordData - Password change data
   * @returns {Promise<Object>} - { success, data, message, errors }
   */
  async changePassword(passwordData) {
    try {
      const { data } = await axiosInstance.post('/user/change-password', passwordData);

      if (data.status) {
        return { success: true, data: data.data };
      }
      return { success: false, data: null, message: data.message, errors: data.errors || {} };
    } catch (error) {
      return handleError(error, 'Password change error');
    }
  },

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise<Object>} - { success, data, message, errors }
   */
  async requestPasswordReset(email) {
    try {
      const { data } = await axiosInstance.post('/forgot-password', { email });

      if (data.status) {
        return { success: true, data: data.data };
      }
      return { success: false, data: null, message: data.message, errors: data.errors || {} };
    } catch (error) {
      return handleError(error, 'Password reset request error');
    }
  },

  /**
   * Reset password with token
   * @param {Object} resetData - Password reset data
   * @returns {Promise<Object>} - { success, data, message, errors }
   */
  async resetPassword(resetData) {
    try {
      const { data } = await axiosInstance.post('/reset-password', resetData);

      if (data.status) {
        return { success: true, data: data.data };
      }
      return { success: false, data: null, message: data.message, errors: data.errors || {} };
    } catch (error) {
      return handleError(error, 'Password reset error');
    }
  }
};
