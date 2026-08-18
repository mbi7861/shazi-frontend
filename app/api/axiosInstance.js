import axios from 'axios';
import Cookies from 'js-cookie';
import { getOrCreateSessionId } from '@/app/utils/utils';
import { apiServiceConfig } from '@/app/config/apiService';

const axiosInstance = axios.create({
    baseURL: apiServiceConfig.baseURL,
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    (config) => {
        const authToken = Cookies.get('AUTH-TOKEN');
        if (authToken) {
            config.headers['AUTH-TOKEN'] = authToken;
        } else {
            const sessionId = getOrCreateSessionId();
            config.headers['X-Session-ID'] = sessionId;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default axiosInstance;
