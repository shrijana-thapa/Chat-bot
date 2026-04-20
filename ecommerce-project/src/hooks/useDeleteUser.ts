import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUserApi } from '../userApi/deleteUser';

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteUserApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']});
        },
    });
}