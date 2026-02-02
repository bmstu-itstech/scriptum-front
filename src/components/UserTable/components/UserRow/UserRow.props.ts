import type { User } from '@/shared/api/generated/data-contracts';
import type { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  user: User;
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}
