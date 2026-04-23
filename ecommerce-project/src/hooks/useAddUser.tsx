import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { User } from '../types/user';

export const addUser = async (userData: User) => {
  await axios.post('http://localhost:3000/users', userData);
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
