import type { Props } from '@/components/ScriptsPanel/ScriptsPanel.props';
import type { FC } from 'react';
import cn from 'classnames';
import styles from '@/components/ScriptsPanel/ScriptPanel.module.css';
// import { ScriptsPanelUsecase } from '@/components/ScriptsPanel/ScriptsPanel.usecase';
import { ScriptElement } from '@/components/ScriptsPanel/components/ScriptElement';
import { EmptyScript } from '@/components/ScriptsPanel/components/EmptyScript';

export const ScriptPanel: FC<Props> = ({ scripts, allScriptsLen, className, ...props }) => {
	return (
		<div className={cn(className, styles.scriptPanel)} {...props}>
			<div className={cn(styles.stats, styles.scriptPanel__title)}>
				<span className={styles.counter}>Найдено: {scripts.length}</span>
				<span className={styles.divider}>|</span>
				<span className={styles.counter}>Всего: {allScriptsLen}</span>
			</div>
			<div className={cn(styles.scriptPanel__items)}>
				<EmptyScript />
				{
					scripts.map(script => {
						return <ScriptElement {...script} key={script.scriptId} />;
					})
				}
			</div>
		</div>
	);
};
