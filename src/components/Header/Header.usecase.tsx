import { Button } from '@/layouts/Button';
import { SiriusIcon } from '../icons/SiriusIcon';
import { PersonIcon } from '../icons/PersonIcon';
import { Props as LinkProps } from '@/shared/Link/Link.props';
import { HomeIcon } from '../icons/HomeIcon';
import { TaskIcon } from '../icons/TaskIcon';
import { LoadIcon } from '../icons/LoadIcon';
import { Link } from '@/shared/Link';
import cn from 'classnames';
import style from './Header.module.css';
import { LogoutIcon } from '../icons/LogoutIcon';

export const Links: LinkProps[] = [
	{
		icon: <HomeIcon />,
		title: 'Главная',
	},
	{
		icon: <TaskIcon />,
		title: 'Задачи',
	},
	{
		icon: <LoadIcon />,
		title: 'Загрузка скрипта',
	},
];

export const HeaderUsecase = {
	head: (
		<div className={cn(style.company)}>
			<SiriusIcon className={cn(style.icon)} />
			<div className={cn(style.info)}>
				<p className={cn(style.title)}>Scriptum</p>
				<p className={cn(style.subtitle)}> Система управления скриптами</p>
			</div>
		</div>
	),
	center: (
		<div className={cn(style.links)}>
			{Links.map((link, index) => (
				<Link key={index} icon={link.icon} title={link.title} />
			))}
		</div>
	),
	tail: (
		<div className={cn(style.options)}>
			<div className={cn(style.personBlock)} >
				<PersonIcon className={cn(style.personIcon)} />
				<p className={cn(style.personData)}>Иванов Иван</p>
			</div>
			<Button className='logoutBtn' icon={<LogoutIcon />}>Выйти</Button>
		</div>
	),
};
