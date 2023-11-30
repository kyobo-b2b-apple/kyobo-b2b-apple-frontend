import axiosInstance from './axiosInstance';

export const joinApi = async (
  username?: string,
  password?: string,
  name?: string,
  email?: string,
  phoneNumber?: string,
  address?: string,
  addressDetail?: string,
  agreeTerm1?: boolean,
  agreeTerm2?: boolean,
  agreeTerm3?: boolean,
  agreeTerm4?: boolean,
) => {
  return axiosInstance.post('/api/join-member', {
    username,
    password,
    name,
    email,
    phoneNumber,
    address,
    addressDetail,
    agreeTerm1,
    agreeTerm2,
    agreeTerm3,
    agreeTerm4,
  });
};

export const businessApi = async (
  username?: string,
  password?: string,
  name?: string,
  email?: string,
  phone_number?: string,
  address?: string,
  address_detail?: string,
  agree_term1?: boolean,
  agree_term2?: boolean,
  agree_term3?: boolean,
  agree_term4?: boolean,
  corporate_name?: string,
  registration_number?: string,
  department?: string,
  employee_number?: string,
) => {
  return axiosInstance.post('/api/join-business-member', {
    username,
    password,
    name,
    email,
    phone_number,
    address,
    address_detail,
    agree_term1,
    agree_term2,
    agree_term3,
    agree_term4,
    corporate_name,
    registration_number,
    department,
    employee_number,
  });
};

export const checkUserIdDuplicate = async (username: string) => {
  return axiosInstance.post('/api/check-username', {
    username,
  });
};
