import axiosInstance from './axiosInstance';

export const getEventList = async (page: number, size: number, closed: boolean | null) => {
  return axiosInstance.get('/api/events', { params: { page, size, closed } });
};

export const getEventDetail = async (eventId: number) => {
  return axiosInstance.get(`/api/events/${eventId}`, { params: { eventId } });
};
