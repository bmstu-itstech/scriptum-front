import { IUser } from '@/shared/consts/user';
import type { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
	users: IUser[];
	className?: string;
	onEditUser: (user: IUser) => void;
	onDeleteUser: (userId: number) => void;
}
