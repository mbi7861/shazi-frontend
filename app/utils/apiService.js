import axios from 'axios';
import { apiServiceConfig } from '@/app/config/apiService';
import Cookies from 'js-cookie';

// Create axios instance for API Service
const apiService = axios.create({
    baseURL: apiServiceConfig.baseURL,
    timeout: apiServiceConfig.timeout,
    withCredentials: false,
});

// Request interceptor to add authentication token
apiService.interceptors.request.use(
    (config) => {
        // Get token from cookies (client-side) or from cookies (server-side)
        const authToken = Cookies.get('AUTH-TOKEN');
        if (authToken) {
            config.headers['AUTH-TOKEN'] = authToken;
        }
        
        // Add API token if configured
        if (apiServiceConfig.apiToken) {
            config.headers['Authorization'] = `Bearer ${apiServiceConfig.apiToken}`;
        }
        
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiService.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            Cookies.remove('AUTH-TOKEN');
            // Redirect to login or show auth modal
        }
        return Promise.reject(error);
    }
);

// API Service functions
export const apiServiceService = {
    // Create order
    async createOrder(orderData) {
        try {
            const response = await apiService.post(apiServiceConfig.endpoints.checkout, orderData);
            return { success: true, data: response.data };
        } catch (error) {
            console.error('API Service Error:', error);
            return { success: false, error: error.response?.data || error.message };
        }
    },

    // Get orders
    async getOrders() {
        try {
            const response = await apiService.get(apiServiceConfig.endpoints.orders);
            return { success: true, data: response.data };
        } catch (error) {
            console.error('API Service Error:', error);
            return { success: false, error: error.response?.data || error.message };
        }
    },

    // Apply discount
    async applyDiscount(discountCode) {
        try {
            const response = await apiService.post(apiServiceConfig.endpoints.discount, { code: discountCode });
            return { success: true, data: response.data };
        } catch (error) {
            console.error('API Service Error:', error);
            return { success: false, error: error.response?.data || error.message };
        }
    },

    // Get shipping methods
    async getShippingMethods() {
        try {
            const response = await apiService.get(apiServiceConfig.endpoints.shipping);
            return { success: true, data: response.data };
        } catch (error) {
            console.error('API Service Error:', error);
            return { success: false, error: error.response?.data || error.message };
        }
    },

    // Validate address
    async validateAddress(addressData) {
        try {
            const response = await apiService.post(apiServiceConfig.endpoints.address, addressData);
            return { success: true, data: response.data };
        } catch (error) {
            console.error('API Service Error:', error);
            return { success: false, error: error.response?.data || error.message };
        }
    }
};

export default apiService;
