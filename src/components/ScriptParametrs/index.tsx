import type { Props } from '@/components/ScriptParametrs/ScriptParametrs.props';
import type { FC } from 'react';
// import cn from 'classnames';
// import styles from '@/components/ScriptParametrs/ScriptParametrs.module.css';
import { ScriptParametrsLayout } from '@/layouts/ScriptParametrsLayout';

export const ScriptParametrs: FC<Props> = ({ header, className, children, ...props }) => {
	return (
		<ScriptParametrsLayout header={header} className={className} {...props}>
			{children}
		</ScriptParametrsLayout>
	);
};
