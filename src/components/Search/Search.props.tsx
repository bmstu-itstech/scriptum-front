import type { HTMLAttributes, ReactElement } from 'react';

export default interface Props extends HTMLAttributes<HTMLInputElement> {
	icon?: ReactElement;
	placeholder?: string;
	callback: () => void;
}
