'use client';

import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { orderService } from '@/services';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export const OrderContext = createContext({
  orders: [],
  isLoading: false,
  fetchOrders: async () => { },
  refreshOrders: async () => { },
});

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = useCallback(async () => {

    setIsLoading(true);
    try {
      const result = await orderService.fetchOrders();
      if (!result.success) {
        toast.error(result.message || 'Failed to load orders');
        setOrders([]);
        return;
      }
      setOrders(result.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);
  const refreshOrders = async () => {
    await fetchOrders();
  };


  const value = useMemo(
    () => ({
      orders,
      isLoading,
      fetchOrders,
      refreshOrders,
    }),
    [orders, isLoading, fetchOrders]
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

