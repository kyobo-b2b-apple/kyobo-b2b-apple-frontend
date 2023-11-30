import axiosInstance from './axiosInstance';

export const checkPassword = async (password) => {
  try {
    const response = await axiosInstance.post('/api/member/check-password', { password });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserInfoApi = async (data) => {
  try {
    const response = await axiosInstance.put('/api/member', data);
    return response.data;
  } catch (error) {
    console.error('회원 정보 변경 오류', error);
  }
};
export const getUserInfoApi = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axiosInstance.get('/api/member', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(token);

    return response.data;
  } catch (error) {
    console.error('회원 정보 조회 오류', error);
    throw error;
  }
};
