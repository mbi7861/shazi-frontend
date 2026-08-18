import axios from 'axios';
import Cookies from 'js-cookie';
import { getOrCreateSessionId } from '@/app/utils/utils';
import { apiServiceConfig } from '@/app/config/apiService';

// This API's auth is entirely header-based (AUTH-TOKEN / X-Session-ID,
// attached manually below) — nothing here relies on the browser sending
// cookies cross-origin, so withCredentials stays off. Turning it on
// requires the backend's CORS config to send
// Access-Control-Allow-Credentials: true (it doesn't, by design —
// supports_credentials is false in config/cors.php), so a credentialed
// request would just get blocked by the browser for no benefit.
const axiosInstance = axios.create({
    baseURL: apiServiceConfig.baseURL,
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
