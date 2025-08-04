import type { HTMLAttributes, ReactElement } from 'react';

interface Option {
	value: string;
	label: string;
}

export default interface Props {
	icon?: ReactElement;
	name: string;
	value: string;
	placeholder: string;
	callback: (value: string) => void;
	className?: string;
	options: Option[];
}
