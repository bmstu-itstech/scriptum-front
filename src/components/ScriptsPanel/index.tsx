import type { FC } from 'react';
import styles from './ScriptPanel.module.css'
import { ScriptElement } from './components/ScriptElement';
import { EmptyScript } from './components/EmptyScript';
import cn from 'classnames';
import { Props } from './ScriptsPanel.props';

export const ScriptPanel: FC<Props> = ({ scripts, onDeleteScript, className, ...props }) => {
	return (
		<div className={cn(styles.scriptsPanel, className)} {...props}>
			<div className={styles.scriptsList}>
				{scripts.length > 0 ? (
					scripts.map(script => (
						<ScriptElement
							key={script.scriptId}
							scriptTitle={script.scriptTitle}
							scriptId={script.scriptId}
							countOfRuns={script.countOfRuns}
							subtitle={script.subtitle}
							author={script.author}
							data={script.data}
							className={cn()}
							onDeleteScript={onDeleteScript}
						/>
					))
				) : (
					<EmptyScript />
				)}
			</div>
		</div>
	)
}
