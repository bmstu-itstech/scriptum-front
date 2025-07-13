"use client"
import { FC, useState } from 'react';
import { HeaderLayout } from '@/layouts/HeaderLayout';
import { Props } from './Header.props';
import { HeaderUsecase } from './Header.usecase';
import style from './Header.module.css';
import cn from 'classnames';
import { Props as LinkProps } from '@/shared/Link/Link.props';
import { HomeIcon } from '../icons/HomeIcon';
import { TaskIcon } from '../icons/TaskIcon';
import { LoadIcon } from '../icons/LoadIcon';
import { SiriusIcon } from '../icons/SiriusIcon';
import { Link } from '@/shared/Link';
import { LogoutIcon } from '../icons/LogoutIcon';
import { Button } from '@/layouts/Button';
import { PersonIcon } from '../icons/PersonIcon';
import styleLink from '@/shared/Link/Link.module.css';

enum LinkDirection {
	Main, Tasks, Load
}

const Links: (LinkProps & { direction: LinkDirection })[] = [
	{
		icon: <HomeIcon />,
		title: 'Главная',
		direction: LinkDirection.Main,
	},
	{
		icon: <TaskIcon />,
		title: 'Задачи',
		direction: LinkDirection.Tasks,
	},
	{
		icon: <LoadIcon />,
		title: 'Загрузка скрипта',
		direction: LinkDirection.Load,
	},
];

export const useHeaderUsecase = () => {
	const [activeDirection, setActiveDirection] = useState<LinkDirection>(LinkDirection.Main);

	const handleLinkClick = (direction: LinkDirection) => {
		setActiveDirection(direction);
		console.log(`Navigating to ${Links.find(link => link.direction === direction)?.title}`);
	};

	return {
		head: (
			<div className={cn(style.company)}>
				<SiriusIcon className={cn(style.icon)} />
				<div className={cn(style.info)}>
					<p className={cn(style.title)}>Scriptum</p>
					<p className={cn(style.subtitle)}>Система управления скриптами</p>
				</div>
			</div>
		),
		center: (
			<div className={cn(style.links)}>
				{Links.map((link) => (
					<Link
						key={link.direction}
						icon={link.icon}
						title={link.title}
						className={cn({
							[styleLink.active]: activeDirection === link.direction
						})}
						onClick={() => handleLinkClick(link.direction)}
					/>
				))}
			</div>
		),
		tail: (
			<div className={cn(style.options)}>
				<div className={cn(style.personBlock)}>
					<PersonIcon className={cn(style.personIcon)} />
					<p className={cn(style.personData)}>Иванов Иван</p>
				</div>
				<Button className='logoutBtn' icon={<LogoutIcon />}>
					Выйти
				</Button>
			</div>
		)
	};
};

export const Header: FC<Props> = ({ className, ...props }) => {
	const { head, center, tail } = useHeaderUsecase();

	return (
		<HeaderLayout
			head={head}
			center={center}
			tail={tail}
			className={cn(className, style.header)}
			{...props}
		/>
	);
};
