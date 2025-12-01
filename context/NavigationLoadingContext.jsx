'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Create Navigation Loading Context
export const NavigationLoadingContext = createContext({
  isLoading: false,
  setLoading: () => {},
});

// Custom hook to use Navigation Loading Context
export const useNavigationLoading = () => {
  const context = useContext(NavigationLoadingContext);
  if (!context) {
    throw new Error('useNavigationLoading must be used within a NavigationLoadingProvider');
  }
  return context;
};

// Navigation Loading Provider Component
export const NavigationLoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  // Reset loading state when pathname changes (navigation complete)
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  const setLoading = (loading) => {
    setIsLoading(loading);
  };

  return (
    <NavigationLoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </NavigationLoadingContext.Provider>
  );
};

