import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const FetchUserById = async (id:number) => {
  const res = await axios.get(`http://localhost:3000/users/${id}`);
  return res.data;
};

export const useFetchUserById = (id?: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => 
    FetchUserById(id!),
    enabled: !!id,
  });
};
