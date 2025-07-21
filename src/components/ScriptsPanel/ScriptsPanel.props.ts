import type { HTMLAttributes } from 'react';
import { Props as ScriptProps } from './components/ScriptElement/ScriptElement.props';

export interface Props extends HTMLAttributes<HTMLDivElement> {
	scripts: ScriptProps[];
	onDeleteScript: (scriptId: number) => void;
}
