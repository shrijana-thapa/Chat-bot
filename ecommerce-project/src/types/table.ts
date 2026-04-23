import { User } from './user';

export type Props = {
  data: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};