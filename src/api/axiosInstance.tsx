import axios from 'axios';
import { refreshAccessToken } from './loginApi';
import { API_URL } from './api';
import { logout } from '../store/loginSlice';
import store from '../store';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await refreshAccessToken();
        if (refreshResponse && refreshResponse.accessToken) {
          // check if refreshResponse is not undefined
          localStorage.setItem('accessToken', refreshResponse.accessToken);
          return axiosInstance(originalRequest);
        } else {
          console.error('토큰 획득 실패');
          store.dispatch(logout());
          return Promise.reject(error);
        }
      } catch (refreshError: any) {
        console.error(refreshError);
        if (!refreshError || !refreshError.response || refreshError.response.status === 401) {
          store.dispatch(logout());
        }

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
