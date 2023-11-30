import { API_URL } from './api';
import axiosInstance from './axiosInstance';

export const getReviewsByProductId = async (productId, page = 1, size = 5) => {
  return axiosInstance.get(`${API_URL}/api/reviews/products/${productId}`, {
    params: { page, size },
  });
};

export const deleteReview = async (reviewId: number) => {
  try {
    const response = await axiosInstance.delete(`/api/reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error('리뷰삭제 실패', error);
    throw error;
  }
};
