import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const addToCartApi = async ({ productId, quantity }) => {
  const res = await axios.post('/api/cart-items', {
    productId,
    quantity,
  });
  return res.data;
};
export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
