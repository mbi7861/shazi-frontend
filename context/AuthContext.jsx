'use client';

import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { authService } from '@/services';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { AUTH_COOKIE_NAME } from '@/app/utils/authCookie';

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
  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await authService.fetchUserData();
      if (result.success) {
        setUserData(result.data);
      }
      // Don't show toast for auth errors as they might be expected
      // (e.g. no session yet for a first-time guest visitor)
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    try {
      const result = await authService.login(credentials);
      if (!result.success) {
        toast.error(result.message || 'Login failed');
        throw new Error(result.message || 'Login failed');
      }
      setUserData(result.data.user);
      toast.success('Login successful');
      return result.data;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Register function
  const register = useCallback(async (userData) => {
    setIsLoading(true);
    try {
      const result = await authService.register(userData);
      if (!result.success) {
        toast.error(result.message || 'Registration failed');
        throw new Error(result.message || 'Registration failed');
      }
      setUserData(result.data.user);
      toast.success('Registration successful');
      return result.data;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await authService.logout();
      if (result.success) {
        toast.success('Logged out successfully');
      } else {
        toast.error(result.message || 'Logout failed');
      }
    } finally {
      // Still clear the session even if the server call fails
      Cookies.remove(AUTH_COOKIE_NAME);
      setUserData(null);
      setIsLoading(false);
    }
  }, []);

  // Update profile function
  const updateProfile = useCallback(async (profileData) => {
    setIsLoading(true);
    try {
      const result = await authService.updateProfile(profileData);
      if (!result.success) {
        toast.error(result.message || 'Profile update failed');
        throw new Error(result.message || 'Profile update failed');
      }
      setUserData(result.data.user);
      toast.success('Profile updated successfully');
      return result.data;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Change password function
  const changePassword = useCallback(async (passwordData) => {
    setIsLoading(true);
    try {
      const result = await authService.changePassword(passwordData);
      if (!result.success) {
        toast.error(result.message || 'Password change failed');
        throw new Error(result.message || 'Password change failed');
      }
      toast.success('Password changed successfully');
      return result.data;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Request password reset function
  const requestPasswordReset = useCallback(async (email) => {
    setIsLoading(true);
    try {
      const result = await authService.requestPasswordReset(email);
      if (!result.success) {
        toast.error(result.message || 'Password reset request failed');
        throw new Error(result.message || 'Password reset request failed');
      }
      toast.success('Password reset email sent');
      return result.data;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Reset password function
  const resetPassword = useCallback(async (resetData) => {
    setIsLoading(true);
    try {
      const result = await authService.resetPassword(resetData);
      if (!result.success) {
        toast.error(result.message || 'Password reset failed');
        throw new Error(result.message || 'Password reset failed');
      }
      toast.success('Password reset successfully');
      return result.data;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load user data on mount
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

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
  }), [
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
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
