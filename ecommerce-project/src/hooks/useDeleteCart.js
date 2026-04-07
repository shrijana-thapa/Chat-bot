import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const deleteCartApi = async (productId) => {
  const res = await axios.delete(`/api/cart-items/${productId}`);
  return res.data;
};
export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
