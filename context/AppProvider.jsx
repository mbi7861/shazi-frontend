'use client';

import { AuthProvider } from './AuthContext';
import { ProductProvider } from './ProductContext';
import { CartProvider } from './CartContext';

/**
 * App Provider
 * Composes all domain-specific providers in the correct order
 * 
 * Provider hierarchy:
 * AuthProvider (outermost - provides auth state)
 *   └── ProductProvider (provides product data)
 *       └── CartProvider (innermost - provides cart state)
 *           └── {children}
 */
export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};
