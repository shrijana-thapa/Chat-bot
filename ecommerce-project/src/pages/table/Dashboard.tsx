import { useQuery } from '@tanstack/react-query';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { fetchUsers } from '../../userApi/usersApi';
import { User } from '../../types/user';
import { useDeleteUser } from '../../hooks/useDeleteUser';
import { useUpdateUser } from '../../hooks/useUpdateUser';

const UserDashboard = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();

  const deleteMutation = useDeleteUser();
  const updateMutation = useUpdateUser();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const columnHelper = createColumnHelper<User>();

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('age', {
      header: 'Age',
      cell: (info) => info.getValue(),
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

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 2,
        pageIndex: 0,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching users.</div>;

  const handleEdit = (user: User) => {
    setEditingUser(user);
    reset(user);
  };

  const handleDelete = (userId: number) => {
    deleteMutation.mutate(userId);
  };

  const onSubmit = (data: User) => {
    if (!editingUser) return;
    updateMutation.mutate({ id: editingUser.id, data });
    setEditingUser(null);
    reset();
  };

  return (
    <>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="mb-4 w-64 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Table */}
        <div className="overflow-hidden border rounded-xl shadow">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-4 py-3 font-semibold">
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        className="flex items-center gap-1 cursor-pointer"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: '🔼',
                          desc: '🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-between mt-4 gap-4">
          {/* Page size */}
          <div className="flex items-center gap-2">
            <span>Items per page:</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="border px-2 py-1 rounded"
            >
              <option value={2}>2</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>

          {/* Prev / Next */}
          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Prev
            </button>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>

        {/* Page Jump */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>

          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>

          <input
            type="number"
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-14 border text-center"
          />

          <span>of {table.getPageCount()}</span>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>

          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
        </div>
      </div>

      {editingUser && (
        <div className="max-w-md mx-auto mt-6 p-4 border rounded-lg bg-gray-100">
          <h2 className="text-lg font-bold mb-3">Edit User</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <input
              {...register('name', { required: true })}
              placeholder="Name"
              className="w-full px-3 py-2 border rounded"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
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
                onClick={() => setEditingUser(null)}
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UserDashboard;
