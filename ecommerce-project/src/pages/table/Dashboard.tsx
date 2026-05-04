import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useDeleteUser } from '../../hooks/useDeleteUser';
import { User } from '../../types/user';
import { fetchUsers } from '../../userApi/usersApi';
import { Table } from './Table';

const UserDashboard = () => {
  const deleteMutation = useDeleteUser();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching users.</div>;

  const handleEdit = (user: User) => {
    console.log('Edit user');
    navigate(`/users/edit/${user.id}`);
  };

  const handleDelete = (userId: number) => {
    deleteMutation.mutate(userId);
    console.log('Delete user with ID:', userId);
  };

  return (
    <>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Add User Button */}
        <button
          onClick={() => {
            navigate('/users/add');
          }}
          className="bg-green-500 text-white px-3 py-2 rounded mb-4"
        >
          + Add User
        </button>
        <Table data={data} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </>
  );
};

export default UserDashboard;
