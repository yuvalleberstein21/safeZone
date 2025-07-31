import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type LoginData = {
  username: string;
  password: string;
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginData) => {
      const res = await axios.post(`${BASE_URL}/auth/login`, data, {
        withCredentials: true,
      });
      return res.data;
    },
  });
};
