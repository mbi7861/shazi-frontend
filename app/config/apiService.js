// API Service Configuration
const DEFAULT_API_BASE_URL = 'https://infinite-cart-master-brgweq.laravel.cloud/api';
const DEFAULT_SITE_URL = 'https://infinite-cart-frontend-3b7kjm3hm-labourer-web-apps-projects.vercel.app/';
const DEFAULT_IMAGE_BASE_URL = 'https://infinite-cart-master-brgweq.laravel.cloud/storage';

export const apiServiceConfig = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_BASE_URL,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL,
    imageBaseUrl: process.env.NEXT_PUBLIC_IMAGE_BASE_URL || DEFAULT_IMAGE_BASE_URL,
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

