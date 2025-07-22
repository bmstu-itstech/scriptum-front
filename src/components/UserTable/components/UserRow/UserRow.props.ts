import { IUser } from '@/shared/consts/user';
import type { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
	user: IUser;
	onEditUser: (user: IUser) => void;
	onDeleteUser: (userId: number) => void;
}
