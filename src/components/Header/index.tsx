'use client';
import { FC } from 'react';
import { HeaderLayout } from '@/layouts/HeaderLayout';
import { Props } from './Header.props';
// import {HeaderUsecase} from './Header.usecase';
import style from './Header.module.css';
import cn from 'classnames';
import { SiriusIcon } from '../icons/SiriusIcon';
import Link from 'next/link';
import { LogoutIcon } from '../icons/LogoutIcon';
import { Button } from '@/layouts/Button';
import { PersonIcon } from '../icons/PersonIcon';
import { Links } from '@/components/Header/Header.usecase';
import { usePathname } from 'next/navigation';
import { LinkDirection } from '@/shared/consts/links';
import axios from 'axios';

export const Header: FC<Props> = ({ activePath, className, ...props }) => {
  const activeNextPathName = usePathname();
  activePath = activePath === undefined ? activeNextPathName : activePath;

  return (
    <HeaderLayout
      head={
        <Link className={cn(style.company)} href={LinkDirection.Main}>
          <SiriusIcon className={cn(style.icon)} />
          <div className={cn(style.info)}>
            <p className={cn(style.title)}>Scriptum</p>
            <p className={cn(style.subtitle)}>Система управления скриптами</p>
          </div>
        </Link>
      }
      center={
        <div className={cn(style.links)}>
          {Links.map((link) => (
            <Link
              key={link.direction}
              href={link.direction}
              className={cn(
                style.link,
                activePath === link.direction ? style.linkActive : style.linkHover,
                'smoothTransition',
              )}>
              {link.icon} {link.title}
            </Link>
          ))}
        </div>
      }
      tail={
        <div className={cn(style.options)}>
          <div className={cn(style.personBlock)}>
            <PersonIcon className={cn(style.personIcon)} />
            <p className={cn(style.personData)}>Иванов Иван</p>
          </div>
          <Button onClick={() => {
            axios.post('api/logout').then(() => {
              location.reload();
            });
          }} className={style.logoutBtn} icon={<LogoutIcon />}>
            Выйти
          </Button>
        </div>
      }
      className={cn(className, style.header)}
      {...props}
    />
  );
};
