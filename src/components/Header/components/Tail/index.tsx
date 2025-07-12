import type { FC } from 'react';
import styles from './Tail.module.css';
import cn from 'classnames';
import type { Props } from './Tail.props';
import { tailUsecase } from './Tail.usecase';
import { Button } from '@/shared/Button';
import { PersonIcon } from '@/components/icons/PersonIcon';

export const Tail: FC<Props> = ({ className, ...props }) => {
	return (
		<div className={cn(styles.head, className)} {...props}>
			{tailUsecase.personInfo}
			<Button icon={<PersonIcon />}>Выйти</Button>
		</div>
	);
};
