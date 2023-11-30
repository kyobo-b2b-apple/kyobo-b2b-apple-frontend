import axiosInstance from './axiosInstance';

export interface BookmarkProps {
  page: number;
  size: number;
}

export const addBookmark = async (productId) => {
  try {
    const response = await axiosInstance.post('/api/bookmarks', { productId });
    return response.data;
  } catch (error) {
    console.error('북마크 추가 실패', error);
    return null;
  }
};

export const getBookmark = async (bookmarkProps: BookmarkProps) => {
  const accessToken = localStorage.getItem('accessToken');
  return axiosInstance.get('/api/bookmarks', {
    params: bookmarkProps,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const AddBookmarkToCart = async (bookmarkIds: number[]) => {
  const accessToken = localStorage.getItem('accessToken');
  return axiosInstance.post(
    '/api/bookmarks/to-carts',
    { bookmarkIds },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};

export const DeleteBookmarks = async (bookmarkIds: number[]) => {
  const accessToken = localStorage.getItem('accessToken');
  return axiosInstance.delete('/api/bookmarks', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      bookmarkIds,
    },
  });
};
