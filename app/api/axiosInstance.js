import axios from 'axios';
import Cookies from 'js-cookie';
import { getOrCreateSessionId } from '@/app/utils/utils';

const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost/infinite-cart/public/api',
    credentials: 'include'
});

axiosInstance.interceptors.request.use(
    (config) => {
        const authToken = Cookies.get('AUTH-TOKEN');
        if (authToken) {
            config.headers['AUTH-TOKEN'] = authToken;
        } else {
            // Add session ID for guest users
            const sessionId = getOrCreateSessionId();
            config.headers['X-Session-ID'] = sessionId;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
