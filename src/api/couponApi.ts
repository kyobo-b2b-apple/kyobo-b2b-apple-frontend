import axiosInstance from './axiosInstance';

export const addCoupon = async (code) => {
  const couponItem = {
    code: code,
  };

  try {
    const response = await axiosInstance.post('/api/coupons', couponItem);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const getAllCoupons = async () => {
  try {
    const response = await axiosInstance.get('/api/coupons');
    console.log(response);
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};
