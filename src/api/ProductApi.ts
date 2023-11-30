import axiosInstance from './axiosInstance';
import { API_URL } from './api';

export const getProduct = async (id: string | undefined) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
