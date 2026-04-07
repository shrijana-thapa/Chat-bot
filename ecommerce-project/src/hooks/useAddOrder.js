import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const addOrderApi = async () => {
  await axios.post('/api/orders');
};
export const useAddOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
