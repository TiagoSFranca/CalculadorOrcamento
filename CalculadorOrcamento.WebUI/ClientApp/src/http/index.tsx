import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import localStorageService from "http/localStorageService";
import { UsuarioAutenticado } from 'store/auth/models';

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
    const originalRequest = error.config;
    const rotaRefresh = '/auth/refresh';
    if (error.response.status === 401 && originalRequest.url.indexOf(rotaRefresh) !== -1) {
        window.location.replace('/login');
        return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {

        originalRequest._retry = true;
        const refreshToken = localStorageService.getRefreshToken();
        return HTTP.post(rotaRefresh,
            {
                "token": refreshToken
            })
            .then(response => response.data as Promise<UsuarioAutenticado>)
            .then(data => {
                localStorageService.setToken({ access_token: data.token, refresh_token: data.refreshToken });
                HTTP.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
                return axios(originalRequest);
            })
    }
    return Promise.reject(error);
});

export default HTTP;