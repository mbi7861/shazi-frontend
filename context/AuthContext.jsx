'use client';

import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { authService } from '@/services';
import toast from 'react-hot-toast';

// Create Auth Context with default values
export const AuthContext = createContext({
  userData: null,
  isLoading: false,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  fetchUserData: async () => {},
  updateProfile: async () => {},
  changePassword: async () => {},
  requestPasswordReset: async () => {},
  resetPassword: async () => {},
});

// Custom hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Computed values
  const isAuthenticated = useMemo(() => !!userData, [userData]);

  // Fetch user data
  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const user = await authService.fetchUserData();
      setUserData(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Don't show toast for auth errors as they might be expected
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      setUserData(response.user);
      toast.success('Login successful');
      return response;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setIsLoading(true);
    try {
      const response = await authService.register(userData);
      setUserData(response.user);
      toast.success('Registration successful');
      return response;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUserData(null);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error.message);
      // Still clear user data even if logout fails
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    setIsLoading(true);
    try {
      const response = await authService.updateProfile(profileData);
      setUserData(response.user);
      toast.success('Profile updated successfully');
      return response;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Change password function
  const changePassword = async (passwordData) => {
    setIsLoading(true);
    try {
      const response = await authService.changePassword(passwordData);
      toast.success('Password changed successfully');
      return response;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Request password reset function
  const requestPasswordReset = async (email) => {
    setIsLoading(true);
    try {
      const response = await authService.requestPasswordReset(email);
      toast.success('Password reset email sent');
      return response;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (resetData) => {
    setIsLoading(true);
    try {
      const response = await authService.resetPassword(resetData);
      toast.success('Password reset successfully');
      return response;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Load user data on mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Memoized context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    userData,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register,
    fetchUserData,
    updateProfile,
    changePassword,
    requestPasswordReset,
    resetPassword,
  }), [userData, isLoading, isAuthenticated]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
