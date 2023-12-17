import axiosInstance from './axiosInstance';

interface CancleProps {
  cancelReason: string;
  content: string;
}

export const cancleProductAPi = async (cancleProps: CancleProps, orderId: number) => {
  console.log('api호출: ' + cancleProps);
  return axiosInstance.post(`/api/orders/${orderId}/cancel`, { cancleProps });
};
