import axiosInstance from './axiosInstance';

export const getAddressCards = async () => {
  try {
    const response = await axiosInstance.get('/api/address-cards');

    return response.data.result;
  } catch (error) {
    console.error(error);
  }
};

export const addAddressCard = async (addressCard) => {
  const newAddressCard = {
    address: addressCard.address,
    addressDetail: addressCard.addressDetail,
    name: addressCard.name,
    phoneNumber: addressCard.phoneNumber,
  };

  try {
    const response = await axiosInstance.post('/api/address-cards', newAddressCard);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteAddressCard = async (cardId) => {
  try {
    const response = await axiosInstance.delete(`/api/address-cards/${cardId}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
