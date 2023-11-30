import axiosInstance from './axiosInstance';
import { useDispatch } from 'react-redux';
import { clearCartItems } from '../store/cartSlice';

function createOrderData(products, userInfo) {
  const orderItems = products.map((product) => ({
    productId: product.productId || product.id,
    quantity: product.quantity || 1,
    acpEmail: product.acpEmail,
    acpName: product.acpName,
    acpOptionQuantity: product.acpOptionQuantity,
    accOption1Quantity: product.accOption1Quantity,
    accOption2Quantity: product.accOption2Quantity,
    accOption3Quantity: product.accOption3Quantity,
    accOption4Quantity: product.accOption4Quantity,
  }));

  return {
    orderItems,
    couponId: userInfo.couponId,
    orderName: userInfo.orderName,
    orderPhoneNumber: userInfo.orderPhoneNumber,
    orderEmail: userInfo.orderEmail,

    mean: 'KAKAO_PAY',
    memo: userInfo.memo,
    approveRedirectUrl: 'http://localhost:3000/pay-result-success',
    failRedirectUrl: 'http://localhost:3000/pay-result-fail',
  };
}

// 사용 예:
export const handleOrderSubmit = async (products, orderUserInfo) => {
  const orderData = createOrderData(products, orderUserInfo);
  console.log(orderData);

  try {
    const response = await axiosInstance.post('/api/orders', orderData);

    const paymentPageUrl = response.data.result.nextRedirectUrl;

    window.location.href = paymentPageUrl;
  } catch (error) {
    console.log(error);
  }
};

export const getPayResultByCode = async (code) => {
  try {
    const response = await axiosInstance.get(`/api/orders/${code}/result`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
