import { createColumnHelper } from '@tanstack/react-table';
import { User } from '../../types/user';

const columnHelper = createColumnHelper<User>();

export const getColumns = (
  handleEdit: (user: User) => void,
  handleDelete: (id: number) => void,
) => {
  console.log('🔴 getColumns() called — columns recreated!');
  return [
    columnHelper.accessor('id', {
      header: 'ID',
    }),
    columnHelper.accessor('name', {
      header: 'Name',
    }),
    columnHelper.accessor('email', {
      header: 'Email',
    }),
    columnHelper.accessor('age', {
      header: 'Age',
    }),

    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(user)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(user.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        );
      },
    }),
  ];
};
