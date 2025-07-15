import {HomeIcon} from '../icons/HomeIcon';
import {TaskIcon} from '../icons/TaskIcon';
import {LoadIcon} from '../icons/LoadIcon';
import {LinkDirection} from '@/shared/consts/links';
import type {ReactElement} from 'react';

interface LinkProps {
  icon: ReactElement;
  title: string;
  direction: string;
}

export const Links: (LinkProps & {direction: string})[] = [
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
