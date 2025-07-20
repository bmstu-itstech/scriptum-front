import type { HTMLAttributes } from 'react';

export interface IScriptItem {
	scriptId: number;
	scriptTitle: string;
	subtitle: string;
	countOfRuns: number;
	author: string;
	data: Date;
}

export interface Props extends HTMLAttributes<HTMLAnchorElement>, IScriptItem { }
