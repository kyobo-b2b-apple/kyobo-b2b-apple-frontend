import { API_URL } from './api';
import axiosInstance from './axiosInstance';

export const postInquiry = async (content: string, isPrivate: boolean, productId: string) => {
  const response = await axiosInstance.post(`${API_URL}/api/inquiry`, {
    content,
    isPrivate,
    productId,
  });
  return response.data;
};

export const getProductInquiry = async (productId, page = 1, size = 5) => {
  const response = await axiosInstance.get(`${API_URL}/api/inquiry/products/${productId}`, {
    params: { page, size },
  });

  return response.data.result;
};

export const putInquiry = async (inquiryId: number, content: string, isPrivate: boolean) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/api/inquiry/${inquiryId}`, {
      content,
      isPrivate,
    });

    if (!response.data.isSuccess) {
      console.error('수정 실패', response.data.message);
      return null;
    }

    return response.data;
  } catch (error) {
    console.error('문의 수정 실패', error);
    return null;
  }
};

export const deleteInquiry = async (inquiryId: number) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/api/inquiry/${inquiryId}`);

    if (!response.data.isSuccess) {
      console.error('삭제 실패', response.data.message);
      return null;
    }

    return response.data;
  } catch (error) {
    console.error('문의 삭제 실패', error);
    return null;
  }
};
