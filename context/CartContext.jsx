'use client';

import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { cartService } from '@/services';
import toast from 'react-hot-toast';

// ─── localStorage helpers ────────────────────────────────────────────────────

const SAVED_FOR_LATER_KEY = 'savedForLater';

const getSavedFromStorage = () => {
  try {
    const stored = localStorage.getItem(SAVED_FOR_LATER_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveSavedToStorage = (items) => {
  try {
    localStorage.setItem(SAVED_FOR_LATER_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving savedForLater to localStorage:', error);
  }
};

// ─── Context ─────────────────────────────────────────────────────────────────

export const CartContext = createContext({
  cartItems: [],
  cartCount: 0,
  cartAmount: 0,
  isCartLoading: true,
  savedItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartQuantity: () => {},
  clearCart: () => {},
  fetchCartProducts: async () => {},
  refreshCart: () => {},
  saveForLater: () => {},
  saveItemForLater: () => {},
  removeFromSaved: () => {},
  moveToCart: () => {},
});

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

// ─── Provider ────────────────────────────────────────────────────────────────

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoading, setisCartLoading] = useState(true);
  const [savedItems, setSavedItems] = useState([]);

  // Computed values
  const cartCount = useMemo(() => cartService.getCartCount(cartItems), [cartItems]);
  const cartAmount = useMemo(() => cartService.getCartAmount(cartItems), [cartItems]);

  // ── Load saved-for-later from localStorage on mount ──
  useEffect(() => {
    setSavedItems(getSavedFromStorage());
  }, []);

  // ── Fetch cart products from API ──
  const fetchCartProducts = useCallback(async () => {
    setisCartLoading(true);
    try {
      const cart = cartService.getCartFromStorage();
      const products = await cartService.fetchCartProducts(cart);
      setCartItems(products);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setisCartLoading(false);
    }
  }, []);

  // ── Add to cart ──
  const addToCart = (productItem, quantity = 1) => {
    try {
      const updatedCart = cartService.addToCart(productItem, quantity);
      setCartItems(prev => {
        const itemId = productItem.id;
        const existing = prev.find(p => p.id === itemId);
        const newQty = updatedCart[itemId]?.quantity || 0;
        if (existing) {
          return prev.map(p => p.id === itemId ? { ...p, quantity: newQty } : p);
        }
        return [...prev, { ...productItem, quantity: newQty }];
      });
      toast.success('Item added to cart');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ── Remove from cart ──
  const removeFromCart = (itemId) => {
    try {
      cartService.removeFromCart(itemId);
      setCartItems(prev => prev.filter(item => item.id !== itemId));
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ── Update cart quantity ──
  const updateCartQuantity = (itemId, quantity) => {
    try {
      const productItem = cartItems.find(p => p.id === itemId);
      if (!productItem) {
        toast.error('Item not found in cart');
        return;
      }
      const stock = productItem.stock ?? 0;
      cartService.updateCartQuantity(itemId, quantity, stock);
      if (quantity <= 0) {
        setCartItems(prev => prev.filter(item => item.id !== itemId));
        toast.success('Item removed from cart');
      } else {
        setCartItems(prev =>
          prev.map(item => item.id === itemId ? { ...item, quantity } : item)
        );
        toast.success('Cart updated');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ── Clear cart ──
  const clearCart = () => {
    try {
      cartService.clearCart();
      setCartItems([]);
      localStorage.removeItem('cart');
    } catch (error) {
      console.error(error.message);
    }
  };

  // ── Refresh cart ──
  const refreshCart = async () => {
    await fetchCartProducts();
  };

  // ── Save for later: move item OUT of cart -> saved list ──
  const saveForLater = (itemId) => {
    const item = cartItems.find(p => p.id === itemId);
    if (!item) return;

    // Remove from cart
    cartService.removeFromCart(itemId);
    setCartItems(prev => prev.filter(p => p.id !== itemId));

    // Add to saved list (avoid duplicates)
    setSavedItems(prev => {
      if (prev.find(p => p.id === itemId)) return prev;
      const updated = [...prev, { ...item }];
      saveSavedToStorage(updated);
      return updated;
    });

    toast.success('Item saved for later');
  };

  // ── Remove from saved list permanently ──
  const removeFromSaved = (itemId) => {
    setSavedItems(prev => {
      const updated = prev.filter(p => p.id !== itemId);
      saveSavedToStorage(updated);
      return updated;
    });
    toast.success('Item removed from saved list');
  };

  // ── Save a product item directly (from product page, no cart removal) ──
  const saveItemForLater = (productItem) => {
    if (!productItem?.id) return;
    setSavedItems(prev => {
      if (prev.find(p => p.id === productItem.id)) {
        toast.success('Already saved for later');
        return prev;
      }
      const updated = [...prev, { ...productItem }];
      saveSavedToStorage(updated);
      return updated;
    });
    toast.success('Item saved for later');
  };

  // ── Move saved item back to cart ──
  const moveToCart = (itemId) => {
    const item = savedItems.find(p => p.id === itemId);
    if (!item) return;

    // Add back to cart
    addToCart(item, 1);

    // Remove from saved list
    setSavedItems(prev => {
      const updated = prev.filter(p => p.id !== itemId);
      saveSavedToStorage(updated);
      return updated;
    });
  };

  // Load cart on mount
  useEffect(() => {
    fetchCartProducts();
  }, []);

  // Listen for cross-tab / same-tab cart storage events
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'cart' || e.type === 'cartUpdated') {
        fetchCartProducts();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
    };
  }, [fetchCartProducts]);

  const value = useMemo(() => ({
    cartItems,
    cartCount,
    cartAmount,
    isCartLoading,
    savedItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    fetchCartProducts,
    refreshCart,
    saveForLater,
    saveItemForLater,
    removeFromSaved,
    moveToCart,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [cartItems, cartCount, cartAmount, isCartLoading, savedItems]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
