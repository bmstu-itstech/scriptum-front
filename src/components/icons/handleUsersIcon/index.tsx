import Image from 'next/image';
import { FC } from 'react';
import src from '@/assets/icons/handleUsersIcon.svg';
import { Props } from './HandleUsersIcon.props';

export const HandleUsersIcon: FC<Props> = ({ className, ...props }) => {
  return <Image alt='HandleUsersIcon' src={src} className={className} {...props} />;
};
