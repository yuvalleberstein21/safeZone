import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const deleteUserApi = async (id: number) => {
  const res = await axios.delete(`${BASE_URL}/admin/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      // מרענן את רשימת המשתמשים
      queryClient.invalidateQueries({ queryKey: ['adminDashboard'] });
    },
    onError: (error: any) => {
      console.error(
        'שגיאה במחיקת המשתמש:',
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || 'שגיאה במחיקה');
    },
  });
};
