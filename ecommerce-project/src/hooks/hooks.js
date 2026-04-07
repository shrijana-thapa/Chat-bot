import { useQuery } from '@tanstack/react-query';
import { getCartItems } from '../api/cart';

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: getCartItems,
  });
};
