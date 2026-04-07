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
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData(['cart']);

      queryClient.setQueryData(['cart'], (old = []) =>
        old.filter((item) => item.productId !== productId),
      );
      return { previousCart };
    },
    onError: (err, productId, context) => {
      queryClient.setQueryData(['cart'], context.previousCart);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
