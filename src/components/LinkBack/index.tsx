'use client';
import type {FC} from 'react';
import {Props} from '@/components/LinkBack/LinkBack.props';
import {useRouter} from 'next/navigation';
import style from '@/components/LinkBack/LinkBack.module.css';


export const LinkBack: FC<Props> = ({title, icon, className, ...props}) => {
  const router = useRouter();
  return (
    <div className={style.LinkBack} onClick={() => router.back()} {...props}>
      {icon}
      <p className={className}>{title}</p>
    </div>
  );
};
