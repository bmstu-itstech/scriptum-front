import type { HTMLAttributes } from 'react';
import { IScriptItem } from './components/ScriptElement/ScriptElement.props';

export interface Props extends HTMLAttributes<HTMLDivElement> {
	scripts: IScriptItem[];
	allScriptsLen: number;
}
