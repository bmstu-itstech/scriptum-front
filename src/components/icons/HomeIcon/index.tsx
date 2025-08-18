import Image from 'next/image';
import { FC } from 'react';
import src from '@/assets/icons/homeIcon.svg';
import { Props } from './HomeIcon.props';

export const HomeIcon: FC<Props> = ({ className, ...props }) => {
  return <Image alt='HomeIcon' src={src} className={className} {...props} />;
};
