import type { Props } from '@/layouts/PageLayout/PageLayout.props';
import { Container } from '@/shared/Container';
import type { FC } from 'react';
import styles from '@/layouts/PageLayout/PageLayout.module.css';
import cn from 'classnames';

export const PageLayout: FC<Props> = ({ icon, title, subtitle, children, className, ...props }) => {
	return (
		<Container {...props} className={cn(styles.main, className)}>
			{
				(title && subtitle) &&
				<div className={cn(styles.header)}>
					{icon && <span className={cn(styles.icon)}>{icon}</span>}
					<h1 className={cn(styles.title)}>{title}</h1>
					<h3 className={cn(styles.subtitle)}>{subtitle}</h3>
				</div>
			}

			{children}
		</Container>
	);
};
