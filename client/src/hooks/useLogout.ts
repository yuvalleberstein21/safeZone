// hooks/useLogout.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await axios.post(`${BASE_URL}/auth/logout`, null, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      // מנקה את ה-cached user
      queryClient.setQueryData(['currentUser'], null);
    },
  });
};
