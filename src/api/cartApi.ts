import axiosInstance from './axiosInstance';

export const addToCart = async (product) => {
  const cartItem = {
    productId: product.productId,
    quantity: product.quantity,
    acpEmail: product.acpEmail,
    acpName: product.acpName,
    acpOptionQuantity: product.acpOptionQuantity,
    accOption1Quantity: product.accOption1Quantity,
    accOption2Quantity: product.accOption2Quantity,
    accOption3Quantity: product.accOption3Quantity,
    accOption4Quantity: product.accOption4Quantity,
  };

  try {
    const response = await axiosInstance.post('/api/carts', cartItem);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const getCartItems = async () => {
  try {
    const response = await axiosInstance.get('/api/carts');

    return response.data.result;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCartItems = async (cartIds: number[]) => {
  try {
    const response = await axiosInstance.delete('/api/carts', { data: { cartIds } });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCartItem = async (product) => {
  const updatedItem = {
    quantity: product.quantity,
    acpEmail: product.acpEmail,
    acpName: product.acpName,
    acpOptionQuantity: product.acpOptionQuantity,
    accOption1Quantity: product.accOption1Quantity,
    accOption2Quantity: product.accOption2Quantity,
    accOption3Quantity: product.accOption3Quantity,
    accOption4Quantity: product.accOption4Quantity,
  };

  try {
    const response = await axiosInstance.put(`/api/carts/${product.id}`, updatedItem);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
