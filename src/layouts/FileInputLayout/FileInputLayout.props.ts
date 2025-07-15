import type { HTMLAttributes } from 'react';
import React from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
	icon?: React.ReactNode;
	isRequired: boolean;
	placeholder: string;
	errorText: string;
}
