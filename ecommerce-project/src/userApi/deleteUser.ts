export const deleteUserApi = async (id: number) => {
  return await fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' });
};
