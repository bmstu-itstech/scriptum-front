import { FC } from 'react';
import { HeaderLayout } from '@/layouts/HeaderLayout';
import { Props } from './Header.props';
import { HeaderUsecase } from './Header.usecase';
import style from './Header.module.css';
import cn from 'classnames';

export const Header: FC<Props> = ({ className, ...props }) => {
	return (
		<HeaderLayout
			head={HeaderUsecase.head}
			center={HeaderUsecase.center}
			tail={HeaderUsecase.tail}
			className={cn(className, style.header)}
			{...props}
		/>
	);
};
