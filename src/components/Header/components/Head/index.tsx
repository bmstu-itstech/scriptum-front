import type { FC } from 'react';
import styles from './Head.module.css';
import cn from 'classnames';
import type { Props } from './Head.props';
import { headUsecase } from './Head.usecase';

export const Head: FC<Props> = ({ className, ...props }) => {
	return (
		<div className={cn(styles.head, className)} {...props}>
			{headUsecase.icon && <span className={cn(styles.icon)}>{headUsecase.icon}</span>}
			<p className={cn(styles.title)}>{headUsecase.title}</p>
			{headUsecase.subtitle && <p className={cn(styles.subtitle)}>{headUsecase.subtitle}</p>}
		</div>
	);
};
