import axios from 'axios';
import type { User } from '../types/user';
import { useQuery } from '@tanstack/react-query';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchManagerUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(`${BASE_URL}/manager/users`, {
    withCredentials: true,
  });

  return response.data; // מחזיר ישירות את המערך
};
export const useManagerUsers = () => {
  return useQuery({
    queryKey: ['managerUsers'],
    queryFn: fetchManagerUsers,
  });
};
