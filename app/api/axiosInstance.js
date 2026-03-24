import axios from 'axios';
import Cookies from 'js-cookie';
import { getOrCreateSessionId } from '@/app/utils/utils';
import { apiServiceConfig } from '@/app/config/apiService';

const axiosInstance = axios.create({
    baseURL: apiServiceConfig.baseURL,
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
    (error) => console.error(error)
);

export default axiosInstance;
