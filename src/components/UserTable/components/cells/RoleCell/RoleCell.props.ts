import { EditUserData, UserRole } from '@/shared/consts/user';
import type { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
	isEditing: boolean;
	editData: EditUserData;
	user: {
		role: UserRole;
	};
	onRoleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
