import axios from 'axios';
import type { ReportData } from '../types/report';
import { useMutation } from '@tanstack/react-query';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const usePostReport = () => {
  return useMutation({
    mutationFn: async (data: ReportData) => {
      const res = await axios.post(`${BASE_URL}/report`, data, {
        withCredentials: true,
      });
      return res.data;
    },
  });
};
