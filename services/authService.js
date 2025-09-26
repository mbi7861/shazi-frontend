import axiosInstance from '@/app/api/axiosInstance';

/**
 * Auth Service
 * Handles all authentication-related API calls
 */
export const authService = {
  /**
   * Fetch current user data
   * @returns {Promise<Object>} - User data or throws error
   */
  async fetchUserData() {
    try {
      const { data } = await axiosInstance.get('/get-user');
      
      if (data.status) {
        return data.data.user;
      } else {
        throw new Error(data.message || 'Failed to fetch user data');
      }
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message || 'User fetch error');
    }
  },

  /**
   * Login user
   * @param {Object} credentials - Login credentials
   * @returns {Promise<Object>} - Login response or throws error
   */
  async login(credentials) {
    try {
      const { data } = await axiosInstance.post('/login', credentials);
      
      if (data.status) {
        return data.data;
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message || 'Login error');
    }
  },

  /**
   * Register user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} - Registration response or throws error
   */
  async register(userData) {
    try {
      const { data } = await axiosInstance.post('/register', userData);
      
      if (data.status) {
        return data.data;
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message || 'Registration error');
    }
  },

  /**
   * Logout user
   * @returns {Promise<Object>} - Logout response or throws error
   */
  async logout() {
    try {
      const { data } = await axiosInstance.post('/logout');
      
      if (data.status) {
        return data.data;
      } else {
        throw new Error(data.message || 'Logout failed');
      }
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message || 'Logout error');
    }
  },

  /**
   * Update user profile
   * @param {Object} userData - Updated user data
   * @returns {Promise<Object>} - Updated user data or throws error
   */
  async updateProfile(userData) {
    try {
      const { data } = await axiosInstance.put('/user/profile', userData);
      
      if (data.status) {
        return data.data;
      } else {
        throw new Error(data.message || 'Profile update failed');
      }
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message || 'Profile update error');
    }
  },

  /**
   * Change password
   * @param {Object} passwordData - Password change data
   * @returns {Promise<Object>} - Password change response or throws error
   */
  async changePassword(passwordData) {
    try {
      const { data } = await axiosInstance.post('/user/change-password', passwordData);
      
      if (data.status) {
        return data.data;
      } else {
        throw new Error(data.message || 'Password change failed');
      }
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message || 'Password change error');
    }
  },

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise<Object>} - Password reset response or throws error
   */
  async requestPasswordReset(email) {
    try {
      const { data } = await axiosInstance.post('/forgot-password', { email });
      
      if (data.status) {
        return data.data;
      } else {
        throw new Error(data.message || 'Password reset request failed');
      }
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message || 'Password reset request error');
    }
  },

  /**
   * Reset password with token
   * @param {Object} resetData - Password reset data
   * @returns {Promise<Object>} - Password reset response or throws error
   */
  async resetPassword(resetData) {
    try {
      const { data } = await axiosInstance.post('/reset-password', resetData);
      
      if (data.status) {
        return data.data;
      } else {
        throw new Error(data.message || 'Password reset failed');
      }
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message || 'Password reset error');
    }
  }
};
