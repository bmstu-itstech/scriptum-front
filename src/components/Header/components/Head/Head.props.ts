import type { HTMLAttributes, ReactElement } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
	icon?: ReactElement;
	title: string;
	subtitle?: string;
}
