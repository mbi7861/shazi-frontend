// API Service Configuration
export const apiServiceConfig = {
    // Base URL for API Service
    baseURL: process.env.NEXT_PUBLIC_API_SERVICE_URL || 'http://localhost/infinite-cart/public/api',
    timeout: 10000,
    apiToken: process.env.API_SERVICE_TOKEN || '',
    endpoints: {
        checkout: '/checkout',
        orders: '/orders',
        discount: '/discount',
        shipping: '/shipping',
        address: '/address',
        products: '/products',
        categories: '/categories',
        users: '/users',
        auth: '/auth',
        cart: '/cart',
        wishlist: '/wishlist',
        reviews: '/reviews',
        search: '/search',
        notifications: '/notifications',
        settings: '/settings',
        profile: '/profile',
        orders: '/orders',
        orderDetails: '/orders/{id}',
        orderStatus: '/orders/{id}/status',
        orderCancel: '/orders/{id}/cancel',
        orderReturn: '/orders/{id}/return',
        orderRefund: '/orders/{id}/refund'
    }
};

export const getApiServiceUrl = (endpoint) => {
    return `${apiServiceConfig.baseURL}${endpoint}`;
};

