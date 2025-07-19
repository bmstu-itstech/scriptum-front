import type { HTMLAttributes } from 'react';
import React from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
	icon?: React.ReactElement;
	title?: string;
	subtitle?: string;
}
