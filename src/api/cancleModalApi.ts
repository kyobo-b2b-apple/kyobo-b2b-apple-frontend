import axiosInstance from './axiosInstance';

interface CancleContent {
  cancelReason: string;
  content: string;
}

export const cancleProductAPi = async (orderId: number, body: CancleContent) => {
  console.log('api호출: ' + body);
  return axiosInstance.post(`/api/orders/${orderId}/cancel`, body);
};

export const getCancleDetailAPi = async (cancelCode: string) => {
  console.log('getCancleDetailAPi');
  return axiosInstance.get(`/api/orders/${cancelCode}/cancel`);
};
