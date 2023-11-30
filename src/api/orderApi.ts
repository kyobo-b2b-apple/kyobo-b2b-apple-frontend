import axiosInstance from './axiosInstance';

export interface OrderListProps {
  page: number;
  size: number;
  csOnly: boolean;
  year: string;
  accessToken: string;
}

export const getOrderList = async ({ page, size, csOnly, year, accessToken }: OrderListProps) => {
  return axiosInstance.get('/api/orders', {
    params: { page, size, csOnly, year },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const getOrderDetail = async (orderCode: string) => {
  return axiosInstance.get(`/api/orders/${orderCode}`);
};

export const getShipmentDetail = async (orderCode: string) => {
  return axiosInstance.get(`/api/orders/${orderCode}/shipment`);
};
