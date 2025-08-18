import { EditUserData } from '@/shared/consts/user';
import type { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  isEditing: boolean;
  editData: EditUserData;
  errors: Record<string, string | null>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputBlur: (field: 'email' | 'password' | 'fullname') => void;
}
