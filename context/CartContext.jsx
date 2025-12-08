'use client';

import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { cartService } from '@/services';
import toast from 'react-hot-toast';

export const CartContext = createContext({
  cartItems: [],
  cartCount: 0,
  cartAmount: 0,
  isCartLoading: true,
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartQuantity: () => {},
  clearCart: () => {},
  fetchCartProducts: async () => {},
  refreshCart: () => {},
});

// Custom hook to use Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoading, setisCartLoading] = useState(true);

  // Computed values
  const cartCount = useMemo(() => cartService.getCartCount(cartItems), [cartItems]);
  const cartAmount = useMemo(() => cartService.getCartAmount(cartItems), [cartItems]);

  // Fetch cart products from API
  const fetchCartProducts = async () => {
    setisCartLoading(true);
    try {
      const cart = cartService.getCartFromStorage();
      console.log("LOCAL STORAGE CART:", cart);

      const products = await cartService.fetchCartProducts(cart);
      setCartItems(products);
      console.log(products);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setisCartLoading(false);
    }
  };

  // Add product item to cart
  const addToCart = (productItem, quantity = 1) => {
    try {
      const updatedCart = cartService.addToCart(productItem, quantity);
      
      // Update local state
      setCartItems(prev => {
        const itemId = productItem.id;
        const existing = prev.find(p => p.id === itemId);
        const newQty = updatedCart[itemId]?.quantity || 0;
        
        if (existing) {
          return prev.map(p =>
            p.id === itemId ? { ...p, quantity: newQty } : p
          );
        } else {
          // Store product_item with product data for display
          return [...prev, { ...productItem, quantity: newQty }];
        }
      });
      
      toast.success('Item added to cart');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Remove product item from cart
  const removeFromCart = (itemId) => {
    try {
      cartService.removeFromCart(itemId);
      setCartItems(prev => prev.filter(item => item.id !== itemId));
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Update cart quantity
  const updateCartQuantity = (itemId, quantity) => {
    try {
      const productItem = cartItems.find(p => p.id === itemId);
      if (!productItem) {
        toast.error('Item not found in cart');
        return;
      }

      const stock = productItem.stock ?? 0;
      const updatedCart = cartService.updateCartQuantity(itemId, quantity, stock);
      
      if (quantity <= 0) {
        setCartItems(prev => prev.filter(item => item.id !== itemId));
        toast.success('Item removed from cart');
      } else {
        setCartItems(prev => prev.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        ));
        toast.success('Cart updated');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Clear entire cart
  const clearCart = () => {
    try {
      cartService.clearCart();
      setCartItems([]);
      toast.success('Cart cleared');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Refresh cart (re-fetch from API)
  const refreshCart = async () => {
    await fetchCartProducts();
  };

  // Load cart on mount
  useEffect(() => {
    fetchCartProducts();
  }, []);

  // Memoized context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    cartItems,
    cartCount,
    cartAmount,
    isCartLoading,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    fetchCartProducts,
    refreshCart,
  }), [cartItems, cartCount, cartAmount, isCartLoading]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
