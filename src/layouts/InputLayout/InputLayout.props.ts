import type { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
	value: string;
	toggleIcons?: {
		show: React.ReactNode;
		hide: React.ReactNode;
	},
	isPassword?: boolean;
	isRequired?: boolean;
	placeholder: string;
	errorText: string;
}
