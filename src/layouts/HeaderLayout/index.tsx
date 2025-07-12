import type { Props } from '@/layouts/HeaderLayout/HeaderLayout.props';
import { Container } from '@/shared/Container';
import type { FC } from 'react';
import styles from '@/layouts/HeaderLayout/HeaderLayout.module.css';
import cn from 'classnames';

export const HeaderLayout: FC<Props> = ({ head, center, tail, className, ...props }) => {
	return (
		<Container {...props} className={cn(styles.header, className)}>
			<div className={styles.head}>{head}</div>
			{center && <div className={styles.center}>{center}</div>}
			{tail && <div className={styles.tail}>{tail}</div>}
		</Container>
	);
};
