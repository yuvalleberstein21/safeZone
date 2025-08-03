import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type RegisterData = {
  username: string;
  name: string;
  area: string;
  password: string;
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const res = await axios.post(`${BASE_URL}/auth/register`, data, {
        withCredentials: true,
      });
      return res.data;
    },
  });
};
