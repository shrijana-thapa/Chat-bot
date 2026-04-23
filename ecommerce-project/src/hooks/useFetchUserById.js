import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const FetchUserById = async ({ id }) => {
  return axios.get(`http://localhost:3000/users/${id}`).then((res) => res.data);
};

export const useFetchUserById = (id) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => FetchUserById({ id }),
  });
};
