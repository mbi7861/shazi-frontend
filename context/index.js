/**
 * Context Index
 * Central export for all context modules
 */

// Individual contexts and hooks
export { AuthContext, useAuth, AuthProvider } from './AuthContext';
export { ProductContext, useProducts, ProductProvider } from './ProductContext';
export { CartContext, useCart, CartProvider } from './CartContext';
export { OrderContext, useOrders, OrderProvider } from './OrderContext';

// Composed provider
export { AppProvider } from './AppProvider';

// Legacy exports for backward compatibility during migration
export { AppContext, useAppContext, AppContextProvider } from './AppContext';
