import axiosInstance from './axiosInstance';

export interface MyInquiryProps {
  page: number;
  size: number;
  year: string;
}

export const getMyInquiry = async (myInquiryProps: MyInquiryProps) => {
  const accessToken = localStorage.getItem('accessToken');
  return axiosInstance.get('/api/my-inquiry', {
    params: myInquiryProps,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
