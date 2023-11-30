import { API_URL } from './api';
import axiosInstance from './axiosInstance';

export const landingApi = (category: string, size: number) => {
  return axiosInstance
    .get(`${API_URL}/api/products?largeCategory=${category}&size=${size}`)
    .then((response) => response.data)

    .catch((error) => {
      throw error;
    });
};
