import type { Role } from '@/shared/api/generated/data-contracts';

export interface EditUserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
}
