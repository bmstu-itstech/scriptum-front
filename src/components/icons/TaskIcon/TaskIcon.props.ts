import type { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLImageElement> {
	width: number;
	height: number;
}
