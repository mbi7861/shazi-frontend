import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost/infinite-cart/public/api',
    credentials: 'include'
});

axiosInstance.interceptors.request.use(
    (config) => {
        const authToken = Cookies.get('AUTH-TOKEN');
        if (authToken) {
            config.headers['AUTH-TOKEN'] = authToken;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
