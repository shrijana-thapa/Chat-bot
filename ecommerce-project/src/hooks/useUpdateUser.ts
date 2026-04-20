import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserApi } from '../userApi/updateUser';

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateUserApi,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']});
        }
    });
}