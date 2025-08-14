import type { Props } from './Button.props';
import type { FC } from 'react';
import cn from 'classnames';
import styles from './Button.module.css'

export const Button: FC<Props> = ({ icon, className, isLoading = false, children, type = 'button', ...props }) => {
	return <button disabled={isLoading} type={type} className={cn(styles.btn, 'smoothTransition', className)} {...props}>{icon}{children}</button>;
};
