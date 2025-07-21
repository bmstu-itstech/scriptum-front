import type { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
	type: 'alert' | 'confirm';
	title: string;
	message: string;
	isVisible: boolean;
	onClose: () => void;
	onConfirm?: () => void;
	confirmText?: string;
	cancelText?: string;
}
