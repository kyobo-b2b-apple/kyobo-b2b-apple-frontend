import { API_URL } from './api';
import axiosInstance from './axiosInstance';

export const sendInquiry = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/api/application`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('서버 에러:', error);
    return { success: false, error };
  }
};
