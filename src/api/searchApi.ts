import axiosInstance from './axiosInstance';
import SearchProps from '../interfaces/searchProps';

export const getSearchResult = async (searchProps: SearchProps) => {
  return axiosInstance.get('/api/products', { params: searchProps });
};
