import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const updateCartApi = async (productId, deliveryOptionId) => {
  await axios.put(`/api/cart-items/${productId}`, {
    deliveryOptionId,
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
