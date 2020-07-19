import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000/api'

const instanceAxios = axios.create({
    baseURL: baseUrl
});

instanceAxios.interceptors.request.use((config) => {
    config.headers['x-auth-token'] =  localStorage.token;
    return config;
});

instanceAxios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        localStorage.clear();
        window.location='/auth';
    };
    return Promise.reject(error);
});

export default instanceAxios;
