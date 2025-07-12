import type { Props } from '@/shared/Button/Button.props';
import type { FC } from 'react';
import cn from 'classnames';
import styles from '@/shared/Button/Button.module.css'

export const Button: FC<Props> = ({ icon, className, children, ...props }) => {
	return <button className={cn(className, styles.btn)} {...props}>{icon}{children}</button>;
};
