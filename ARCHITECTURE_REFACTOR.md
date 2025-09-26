# Next.js App Architecture Refactor

This document outlines the clean, enterprise-style architecture implemented for the Next.js e-commerce application.

## 🏗️ New Architecture Overview

The application has been refactored from a single monolithic `AppContext` to a clean, modular architecture with separated concerns:

### 1. **Services Layer** (`/services/`)
- **Purpose**: Handles all API calls and business logic
- **Benefits**: Reusable, testable, and can be used in both client and server components
- **Files**:
  - `productService.js` - Product-related API calls
  - `cartService.js` - Cart operations and localStorage management
  - `authService.js` - Authentication operations
  - `orderService.js` - Order management
  - `index.js` - Central export

### 2. **Context Layer** (`/context/`)
- **Purpose**: Manages application state and provides data to components
- **Benefits**: Domain-specific, optimized with useMemo, clear separation of concerns
- **Files**:
  - `AuthContext.jsx` - User authentication state
  - `ProductContext.jsx` - Product data and filtering
  - `CartContext.jsx` - Shopping cart state
  - `AppProvider.jsx` - Composes all providers
  - `index.js` - Central export

### 3. **Provider Composition**
```jsx
<AuthProvider>
  <ProductProvider>
    <CartProvider>
      {children}
    </CartProvider>
  </ProductProvider>
</AuthProvider>
```

## 📁 New Folder Structure

```
├── services/
│   ├── productService.js      # Product API calls
│   ├── cartService.js         # Cart operations
│   ├── authService.js         # Authentication
│   ├── orderService.js        # Order management
│   └── index.js              # Service exports
├── context/
│   ├── AuthContext.jsx        # Auth state management
│   ├── ProductContext.jsx     # Product state management
│   ├── CartContext.jsx        # Cart state management
│   ├── AppProvider.jsx        # Provider composition
│   ├── AppContext.jsx         # Legacy context (for migration)
│   └── index.js              # Context exports
└── components/
    ├── ProductListingExample.jsx  # Example implementation
    └── ... (other components)
```

## 🔧 Service Layer Details

### Product Service
```javascript
import { productService } from '@/services';

// Fetch products with filters
const products = await productService.fetchProducts({ 
  category_id: 1, 
  per_page: 10 
});

// Search products
const results = await productService.searchProducts('laptop');

// Get single product
const product = await productService.fetchProductById(123);
```

### Cart Service
```javascript
import { cartService } from '@/services';

// Add to cart
cartService.addToCart(product, quantity);

// Update quantity
cartService.updateCartQuantity(productId, newQuantity);

// Remove from cart
cartService.removeFromCart(productId);

// Get cart from localStorage
const cart = cartService.getCartFromStorage();
```

### Auth Service
```javascript
import { authService } from '@/services';

// Login
const user = await authService.login({ email, password });

// Register
const user = await authService.register(userData);

// Fetch user data
const user = await authService.fetchUserData();
```

## 🎯 Context Usage

### Auth Context
```jsx
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { 
    userData, 
    isAuthenticated, 
    login, 
    logout, 
    isLoading 
  } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {userData.name}!</p>
      ) : (
        <button onClick={() => login(credentials)}>Login</button>
      )}
    </div>
  );
}
```

### Product Context
```jsx
import { useProducts } from '@/context/ProductContext';

function ProductList() {
  const { 
    products, 
    categories, 
    isLoading, 
    fetchProducts, 
    searchProducts,
    setFilters 
  } = useProducts();

  const handleSearch = async (query) => {
    await searchProducts(query);
  };

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Cart Context
```jsx
import { useCart } from '@/context/CartContext';

function CartSummary() {
  const { 
    cartItems, 
    cartCount, 
    cartAmount, 
    addToCart, 
    removeFromCart 
  } = useCart();

  return (
    <div>
      <p>Items: {cartCount}</p>
      <p>Total: ${cartAmount}</p>
      {cartItems.map(item => (
        <div key={item.id}>
          {item.title} - {item.pivot.quantity}
        </div>
      ))}
    </div>
  );
}
```

## 🚀 Migration Guide

### Step 1: Update Imports
Replace old context imports:
```jsx
// Old
import { useAppContext } from '@/context/AppContext';

// New
import { useAuth } from '@/context/AuthContext';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
```

### Step 2: Update Component Logic
```jsx
// Old
function MyComponent() {
  const { userData, products, cartItems, addToCart } = useAppContext();
  // ...
}

// New
function MyComponent() {
  const { userData } = useAuth();
  const { products } = useProducts();
  const { cartItems, addToCart } = useCart();
  // ...
}
```

### Step 3: Use Services Directly (Optional)
For server-side rendering or non-context usage:
```jsx
import { productService } from '@/services';

export async function getServerSideProps() {
  const products = await productService.fetchProducts();
  return { props: { products } };
}
```

## ✨ Benefits of New Architecture

### 1. **Separation of Concerns**
- Each context handles one domain
- Services are pure functions
- Clear boundaries between layers

### 2. **Performance Optimization**
- `useMemo` prevents unnecessary re-renders
- Context values are memoized
- Only relevant components re-render

### 3. **Reusability**
- Services can be used anywhere
- Contexts are composable
- Easy to test individual pieces

### 4. **Maintainability**
- Clear file organization
- Single responsibility principle
- Easy to add new features

### 5. **Type Safety** (Future Enhancement)
- Easy to add TypeScript
- Clear interfaces between layers
- Better IDE support

## 🔄 Backward Compatibility

The old `AppContext` is still available during migration:
```jsx
// Still works during migration
import { useAppContext } from '@/context/AppContext';
```

## 📝 Example Implementation

See `components/ProductListingExample.jsx` for a complete example showing:
- How to use all three contexts
- Search and filtering functionality
- Cart operations
- Authentication state
- Loading states
- Error handling

## 🧪 Testing Strategy

### Service Testing
```javascript
// services/__tests__/productService.test.js
import { productService } from '../productService';

describe('productService', () => {
  it('should fetch products', async () => {
    const products = await productService.fetchProducts();
    expect(products).toBeDefined();
  });
});
```

### Context Testing
```javascript
// context/__tests__/ProductContext.test.jsx
import { renderHook } from '@testing-library/react';
import { ProductProvider } from '../ProductContext';

test('should provide products context', () => {
  const wrapper = ({ children }) => (
    <ProductProvider>{children}</ProductProvider>
  );
  
  const { result } = renderHook(() => useProducts(), { wrapper });
  expect(result.current.products).toEqual([]);
});
```

## 🚀 Next Steps

1. **Complete Migration**: Update all components to use new contexts
2. **Add TypeScript**: Convert to TypeScript for better type safety
3. **Add Tests**: Implement comprehensive test suite
4. **Performance Monitoring**: Add performance monitoring
5. **Documentation**: Create detailed API documentation

## 📚 Additional Resources

- [React Context Best Practices](https://reactjs.org/docs/context.html)
- [Custom Hooks Patterns](https://reactjs.org/docs/hooks-custom.html)
- [Service Layer Pattern](https://martinfowler.com/eaaCatalog/serviceLayer.html)
