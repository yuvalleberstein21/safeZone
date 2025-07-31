import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// import { User } from '../types/user'; // כולל שדה role: 'user' | 'admin'

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/auth/me`, {
        withCredentials: true,
      });
      console.log(res);
      return res.data;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
