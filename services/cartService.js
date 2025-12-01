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
   * Add product item to cart
   * @param {Object} productItem - Product item to add (with product data)
   * @param {number} quantity - Quantity to add (default: 1)
   * @returns {Object} - Updated cart object
   */
  addToCart(productItem, quantity = 1) {
    try {
      // Use product_item.id as the key for variant-based pricing
      const itemId = productItem.id;
      const stock = productItem.stock ?? 0;
      const cart = this.getCartFromStorage();
      const currentQty = cart[itemId]?.quantity || 0;
      const newQty = currentQty + quantity;

      if (newQty > stock) {
        throw new Error(`Only ${stock} in stock`);
      }

      // Store product_item data with quantity
      cart[itemId] = { 
        quantity: newQty,
        product_item_id: itemId,
        product_id: productItem.product?.id || productItem.product_id,
      };
      this.saveCartToStorage(cart);
      
      return cart;
    } catch (error) {
      throw new Error(error.message || 'Failed to add to cart');
    }
  },

  /**
   * Remove product item from cart
   * @param {string|number} itemId - Product item ID to remove
   * @returns {Object} - Updated cart object
   */
  removeFromCart(itemId) {
    try {
      const cart = this.getCartFromStorage();
      delete cart[itemId];
      this.saveCartToStorage(cart);
      return cart;
    } catch (error) {
      throw new Error(error.message || 'Error removing item from cart');
    }
  },

  /**
   * Update product item quantity in cart
   * @param {string|number} itemId - Product item ID
   * @param {number} quantity - New quantity
   * @param {number} stock - Product item stock limit
   * @returns {Object} - Updated cart object
   */
  updateCartQuantity(itemId, quantity, stock = null) {
    try {
      const cart = this.getCartFromStorage();
      
      if (!cart[itemId]) {
        throw new Error('Item not found in cart');
      }

      if (stock !== null && quantity > stock) {
        throw new Error(`Only ${stock} in stock`);
      }

      if (quantity <= 0) {
        delete cart[itemId];
      } else {
        cart[itemId].quantity = quantity;
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
   * @param {Array} cartItems - Cart items array (product items with product data)
   * @returns {number} - Total amount
   */
  getCartAmount(cartItems) {
    return cartItems.reduce((sum, item) => {
      // Use price from product_item, not from nested prices array
      const price = item.price?.discounted_price || 0;
      const qty = item.pivot?.quantity || 0;
      return sum + price * qty;
    }, 0);
  }
};
