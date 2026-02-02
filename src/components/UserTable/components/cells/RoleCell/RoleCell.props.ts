import { EditUserData } from '@/shared/consts/user';
import { Role } from '@/shared/api/generated/data-contracts';
import type { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  isEditing: boolean;
  editData: EditUserData;
  user: {
    role: Role;
  };
  onRoleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
