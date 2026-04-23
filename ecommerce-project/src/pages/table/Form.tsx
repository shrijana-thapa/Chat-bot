import { useForm } from 'react-hook-form';
import { User } from '../../types/user';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import { useParams } from 'react-router-dom';
import { useAddUser } from '../../hooks/useAddUser';
import { useFetchUserById } from '../../hooks/useFetchUserById';
import { useEffect } from 'react';

export const UserForm = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();

  const isEdit = Boolean(id);

  const { data: user } = useFetchUserById({ id: id ? Number(id) : undefined });
  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const updateMutation = useUpdateUser();
  const addUserMutation = useAddUser();

  const onSubmit = (data: User) => {
    if (isEdit && id) {
      updateMutation.mutate({ id: Number(id), data });
    } else {
      addUserMutation.mutate(data);
    }
    reset();
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-4 border rounded-lg bg-gray-100">
      <h2 className="text-lg font-bold mb-3">
        {' '}
        {isEdit ? 'Edit User' : 'Add User'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register('name', { required: true })}
          placeholder="Name"
          className="w-full px-3 py-2 border rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <input
          {...register('email', { required: 'Email is required' })}
          placeholder="Email"
          className="w-full px-3 py-2 border rounded"
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          {...register('age', {
            valueAsNumber: true,
            min: {
              value: 1,
              message: 'Age must be at least 1',
            },
            max: {
              value: 120,
              message: 'Age must be less than 120',
            },
          })}
          type="number"
          placeholder="Age"
          className="w-full px-3 py-2 border rounded"
        />
        {errors.age && (
          <p className="text-red-500 text-sm">{errors.age.message}</p>
        )}
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Save
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
