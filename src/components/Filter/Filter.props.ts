import type { HTMLAttributes, ReactElement } from 'react';

interface Option {
	value: string;
	label: string;
}

export default interface Props extends HTMLAttributes<HTMLSelectElement> {
	icon?: ReactElement;
	name: string;
	value: string;
	placeholder: string;
	callback: (value: string) => void;
	options: Option[];
}
