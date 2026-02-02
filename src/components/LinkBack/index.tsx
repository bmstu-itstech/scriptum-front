'use client';
import type { FC } from 'react';
import { Props } from '@/components/LinkBack/LinkBack.props';
import { useRouter } from 'next/navigation';
import style from '@/components/LinkBack/LinkBack.module.css';
import cn from 'classnames';

export const LinkBack: FC<Props> = ({ title, icon, className, ...props }) => {
  const router = useRouter();
  return (
    <div className={cn(style.LinkBack)} onClick={() => router.back()} {...props}>
      {icon}
      <p className={cn(className)}>{title}</p>
    </div>
  );
};
