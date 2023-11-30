import axiosInstance from './axiosInstance';

export interface MyReviewProps {
  page: number;
  size: number;
  year: string;
}

interface CommonReviewProps {
  score: number;
  content: string;
  images?: File[];
}

export interface PostReviewProps extends CommonReviewProps {
  orderId: number;
}

export interface EditReviewProps extends CommonReviewProps {
  reviewId: number;
}

export const getMyReview = async (myReviewProps: MyReviewProps) => {
  const accessToken = localStorage.getItem('accessToken');
  console.log('accessToken', accessToken);
  return axiosInstance.get('/api/my-reviews', {
    params: myReviewProps,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const editReview = async ({ score, content, images, reviewId }: EditReviewProps) => {
  try {
    const formData = new FormData();
    formData.append('score', score.toString());
    formData.append('content', content);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    await axiosInstance.put(`/api/reviews/${reviewId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('리뷰 수정 실패:', error);
  }
};

export const postReview = async ({ orderId, score, content, images }: PostReviewProps) => {
  const formData = new FormData();
  formData.append('orderId', orderId.toString());
  formData.append('score', score.toString());
  formData.append('content', content);

  if (images) {
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
  }

  const accessToken = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'multipart/form-data',
  };

  try {
    const response = await axiosInstance.post('/api/reviews', formData, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.error('리뷰 작성 실패:', error);
    throw error;
  }
};
