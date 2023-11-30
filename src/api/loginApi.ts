import axiosInstance from './axiosInstance';

export const loginAPi = async (username: string, password: string) => {
  return axiosInstance.post('/api/login', { username, password });
};

export const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.get('/api/silent-refresh');
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      return { accessToken: response.data.accessToken, expiresAt: response.data.expiresAt };
    } else {
      throw new Error('No access token returned');
    }
  } catch (e) {
    console.log(e);
  }
};
