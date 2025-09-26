import axiosInstance from '@/app/api/axiosInstance';

/**
 * Cart Service
 * Handles all cart-related API calls and localStorage operations
 */
export const cartService = {
  /**
   * Fetch cart products from API
   * @param {Object} cart - Cart object from localStorage
   * @returns {Promise<Array>} - Cart products or throws error
   */
  async fetchCartProducts(cart = {}) {
    try {
      const { data } = await axiosInstance.post('/cart-products', { cart });
      
      if (data?.status) {
        return data.data.cartProducts || [];
      } else {
        throw new Error(data?.message || 'Failed to load cart');
      }
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message || 'Error loading cart');
    }
  },

  /**
   * Get cart from localStorage
   * @returns {Object} - Cart object
   */
  getCartFromStorage() {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : {};
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      return {};
    }
  },

  /**
   * Save cart to localStorage
   * @param {Object} cart - Cart object to save
   */
  saveCartToStorage(cart) {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  },

  /**
   * Add product to cart
   * @param {Object} product - Product to add
   * @param {number} quantity - Quantity to add (default: 1)
   * @returns {Object} - Updated cart object
   */
  addToCart(product, quantity = 1) {
    try {
      const productId = product.id;
      const stock = product.stock ?? 0;
      const cart = this.getCartFromStorage();
      const currentQty = cart[productId]?.quantity || 0;
      const newQty = currentQty + quantity;

      if (newQty > stock) {
        throw new Error(`Only ${stock} in stock`);
      }

      cart[productId] = { quantity: newQty };
      this.saveCartToStorage(cart);
      
      return cart;
    } catch (error) {
      throw new Error(error.message || 'Failed to add to cart');
    }
  },

  /**
   * Remove product from cart
   * @param {string|number} productId - Product ID to remove
   * @returns {Object} - Updated cart object
   */
  removeFromCart(productId) {
    try {
      const cart = this.getCartFromStorage();
      delete cart[productId];
      this.saveCartToStorage(cart);
      return cart;
    } catch (error) {
      throw new Error(error.message || 'Error removing item from cart');
    }
  },

  /**
   * Update product quantity in cart
   * @param {string|number} productId - Product ID
   * @param {number} quantity - New quantity
   * @param {number} stock - Product stock limit
   * @returns {Object} - Updated cart object
   */
  updateCartQuantity(productId, quantity, stock = null) {
    try {
      const cart = this.getCartFromStorage();
      
      if (!cart[productId]) {
        throw new Error('Item not found in cart');
      }

      if (stock !== null && quantity > stock) {
        throw new Error(`Only ${stock} in stock`);
      }

      if (quantity <= 0) {
        delete cart[productId];
      } else {
        cart[productId].quantity = quantity;
      }

      this.saveCartToStorage(cart);
      return cart;
    } catch (error) {
      throw new Error(error.message || 'Failed to update cart quantity');
    }
  },

  /**
   * Clear entire cart
   * @returns {Object} - Empty cart object
   */
  clearCart() {
    try {
      const emptyCart = {};
      this.saveCartToStorage(emptyCart);
      return emptyCart;
    } catch (error) {
      throw new Error(error.message || 'Failed to clear cart');
    }
  },

  /**
   * Get cart count (total items)
   * @param {Array} cartItems - Cart items array
   * @returns {number} - Total item count
   */
  getCartCount(cartItems) {
    return cartItems.reduce((sum, item) => sum + (item.pivot?.quantity || 0), 0);
  },

  /**
   * Get cart total amount
   * @param {Array} cartItems - Cart items array
   * @returns {number} - Total amount
   */
  getCartAmount(cartItems) {
    return cartItems.reduce((sum, item) => {
      const price = item.prices?.[0]?.discounted_price || 0;
      const qty = item.pivot?.quantity || 0;
      return sum + price * qty;
    }, 0);
  }
};
