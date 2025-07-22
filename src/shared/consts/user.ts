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

export interface EditUserData {
	fullname: string;
	email: string;
	password: string;
	confirmPassword: string;
	role: UserRole;
}
