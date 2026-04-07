import { useQuery } from '@tanstack/react-query';
import { getCartItems } from '../api/cart';

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: getCartItems,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
