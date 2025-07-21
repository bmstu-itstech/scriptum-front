export enum UserRole {
	ADMIN = 'admin',
	USER = 'user',
}

export interface IUser {
	id: number;
	fullname: string;
	email: string;
	role: UserRole;
}
