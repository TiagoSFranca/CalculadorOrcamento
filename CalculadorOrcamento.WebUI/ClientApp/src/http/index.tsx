import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import localStorageService from "http/localStorageService";

const conf: AxiosRequestConfig = {
    baseURL: '/api'
}

const HTTP: AxiosInstance = axios.create(conf)

HTTP.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = localStorageService.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    config.headers['Content-type'] = 'application/json'
    return config;
}, error => {
    Promise.reject(error)
})

HTTP.interceptors.response.use((response: any) => {
    return response
}, function (error) {
    if (error.response.status === 401) {
        localStorageService.clearToken();
        window.location.replace('/login');
        return Promise.reject(error);
    }
    return Promise.reject(error);
});

export default HTTP;