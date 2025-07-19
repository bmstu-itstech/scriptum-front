import { Props } from '@/components/ScriptInfo/ScriptInfo.props';
import type { FC } from 'react';
import cn from 'classnames';
import { getDate } from '@/utils/getRowFromDate';
import styles from '@/components/ScriptInfo/ScriptInfo.module.css';

export const ScriptInfo: FC<Props> = ({
	scriptId,
	scriptTitle,
	countOfRuns,
	author,
	data,
	subtitle,
	className,
	...props
}) => {
	return (
		<div className={cn(className, styles.ScriptInfo)} {...props}>
			<h1 className={cn(styles.ScriptInfo__title, 'layout__title')}>{scriptTitle}</h1>
			<h2 className={cn(styles.ScriptInfo__subtitle, 'layout__subtitle')}>{subtitle}</h2>
			<div className={styles.ScriptInfo__info}>
				<p className={styles.ScriptInfo__author}>Автор: {author}</p>
				<p className={styles.ScriptInfo__date}>Создан {getDate(data)}</p>
			</div>
		</div>
	);
};
