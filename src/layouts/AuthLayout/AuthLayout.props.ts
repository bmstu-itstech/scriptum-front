import type { HTMLAttributes } from 'react';
import React from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
	head: React.ReactNode;
	center: React.ReactNode;
	tail: React.ReactNode;
}
