'use client';
import { FC, useMemo } from 'react';
import { HeaderLayout } from '@/layouts/HeaderLayout';
import { Props } from './Header.props';
import style from './Header.module.css';
import cn from 'classnames';
import { SiriusIcon } from '../icons/SiriusIcon';
import Link from 'next/link';
import { LogoutIcon } from '../icons/LogoutIcon';
import { Button } from '@/layouts/Button';
import { PersonIcon } from '../icons/PersonIcon';
import { Links } from '@/components/Header/Header.usecase';
import { usePathname } from 'next/navigation';
import { ADMIN_ROUTES, LinkDirection } from '@/shared/consts/links';
import { useGetUserMe } from '@/hooks/user/useGetUserMe';
import { Role } from '@/shared/api/generated/data-contracts';
import { useLogout } from '@/hooks/auth/useLogout';

export const Header: FC<Props> = ({ activePath, className, ...props }) => {
  const activeNextPathName = usePathname();
  activePath = activePath === undefined ? activeNextPathName : activePath;
  const { data: userData } = useGetUserMe();
  const { logout } = useLogout();

  const visibleLinks = useMemo(() => {
    const isAdmin = userData?.role === Role.Admin;
    return Links.filter((link) => {
      if (ADMIN_ROUTES.includes(link.direction)) {
        return isAdmin;
      }
      return true;
    });
  }, [userData?.role]);

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
          {visibleLinks.map((link) => (
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
            <p className={cn(style.personData)}>{userData?.name || ''}</p>
          </div>
          <Button onClick={logout} className={style.logoutBtn} icon={<LogoutIcon />}>
            Выйти
          </Button>
        </div>
      }
      className={cn(className, style.header)}
      {...props}
    />
  );
};
