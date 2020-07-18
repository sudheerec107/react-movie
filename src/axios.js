import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000/api'

const instanceAxios = axios.create({
    baseURL: baseUrl,
    headers: {'x-auth-token': localStorage.token}
});

export default instanceAxios;
