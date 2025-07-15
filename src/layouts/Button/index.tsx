import type { Props } from './Button.props';
import type { FC } from 'react';
import cn from 'classnames';
import styles from './Button.module.css'

export const Button: FC<Props> = ({ icon, className, children, ...props }) => {
	return <button className={cn(styles.btn, 'smoothTransition', className)} {...props}>{icon}{children}</button>;
};
