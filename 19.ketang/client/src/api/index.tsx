import axios, { AxiosRequestConfig } from 'axios';
axios.defaults.baseURL = "http://localhost:8001";
axios.defaults.headers.post['Content-Type'] = "application/json;charset=UTF-8";
axios.interceptors.request.use((config: AxiosRequestConfig) => {
    let access_token = sessionStorage.getItem('access_token');
    if (access_token)
        config.headers['Authorization'] = `Bearer ${access_token}`;
    return config;
}, (error: any) => Promise.reject(error));
axios.interceptors.response.use(response => response.data, error => Promise.reject(error));
export default axios;