import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { User } from '../types/user';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useCurrentUser = () => {
  return useQuery<User | null>({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        const res = await axios.get(`${BASE_URL}/auth/me`, {
          withCredentials: true,
        });
        return res.data;
      } catch (err: any) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          return null;
        }
        throw err;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
