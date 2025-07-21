import { IUser } from "@/shared/consts/user";
import { HTMLAttributes } from "react";

export interface Props extends HTMLAttributes<HTMLDivElement> {
	users: IUser[];
	onEditUser: (user: IUser) => void;
	onDeleteUser: (userId: number) => void;
}
