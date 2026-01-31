import type { HTMLAttributes } from 'react';
import type { Blueprint } from '@/shared/api/generated/data-contracts';
import { Props as ScriptProps } from './components/ScriptElement/ScriptElement.props';

export interface Props extends HTMLAttributes<HTMLDivElement> {
	scripts: (ScriptProps & { refetch: () => void })[];
	currentUserId?: string;
}
