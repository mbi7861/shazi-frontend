'use client';

import { AuthProvider } from './AuthContext';
import { ProductProvider } from './ProductContext';
import { CartProvider } from './CartContext';
import { NavigationLoadingProvider } from './NavigationLoadingContext';

/**
 * App Provider
 * Composes all domain-specific providers in the correct order
 * 
 * Provider hierarchy:
 * NavigationLoadingProvider (outermost - provides navigation loading state)
 *   └── AuthProvider (provides auth state)
 *       └── ProductProvider (provides product data)
 *           └── CartProvider (innermost - provides cart state)
 *               └── {children}
 */
export const AppProvider = ({ children }) => {
  console.log('AppProvider');
  return (  
    <AuthProvider>
    <NavigationLoadingProvider>
        <ProductProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ProductProvider>
    </NavigationLoadingProvider>
    </AuthProvider>
  );
};
