import axios from 'axios';
import type { Report } from '../types/report';
import { useQuery } from '@tanstack/react-query';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchManagerReports = async (): Promise<Report[]> => {
  const response = await axios.get<{ reports: Report[] }>(
    `${BASE_URL}/report`,
    {
      withCredentials: true,
    }
  );
  return response.data.reports;
};

export const useManagerReports = () => {
  return useQuery({
    queryKey: ['managerReports'],
    queryFn: fetchManagerReports,
  });
};
