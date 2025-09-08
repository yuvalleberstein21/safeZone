import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useAlerts = () => {
  return useQuery({
    queryKey: ['adminDashboard'],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/admin/dashboard`, {
        withCredentials: true,
      });
      console.log(response.data);
      return response.data;
    },
  });
};
