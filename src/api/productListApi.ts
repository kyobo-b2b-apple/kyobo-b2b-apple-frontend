import axiosInstance from './axiosInstance';

export interface ProductListProps {
  page?: number;
  size?: number;
  keyword?: string;
  largeCategory?: string;
  smallCategory?: string | null;
  sortBy?: string;
}

export const getProductList = async (productListProps: ProductListProps) => {
  return axiosInstance.get('/api/products', { params: productListProps });
};
