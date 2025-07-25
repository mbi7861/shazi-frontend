import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost/infinite-cart/public/api',
    // withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers['AUTH-TOKEN'] = localStorage.getItem('AUTH-TOKEN');
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
