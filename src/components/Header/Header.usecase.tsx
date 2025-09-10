import { HomeIcon } from '../icons/HomeIcon';
import { TaskIcon } from '../icons/TaskIcon';
import { LoadIcon } from '../icons/LoadIcon';
import { LinkDirection } from '@/shared/consts/links';
import type { ReactElement } from 'react';
import { CreateUserIcon } from '../icons/CreateUserIcon';
import { HandleUsersIcon } from '../icons/handleUsersIcon';

interface LinkProps {
  icon: ReactElement;
  title: string;
  direction: string;
}

export const AdminLinks: (LinkProps & { direction: string })[] = [
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
    title: 'Загрузка',
    direction: LinkDirection.CreateScript,
  },
  {
    icon: <CreateUserIcon />,
    title: 'Создание',
    direction: LinkDirection.CreateUser,
  },
  {
    icon: <HandleUsersIcon />,
    title: 'Управление',
    direction: LinkDirection.HandleUsers,
  },
];

export const UserLinks: (LinkProps & { direction: string })[] = [
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
    title: 'Загрузка',
    direction: LinkDirection.CreateScript,
  },
];
