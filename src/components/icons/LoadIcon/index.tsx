import Image from 'next/image';
import { FC } from 'react';
import src from '@/assets/icons/loadIcon.svg';
import { Props } from './LoadIcon.props';

export const LoadIcon: FC<Props> = ({ className, ...props }) => {
  return <Image alt='LoadIcon' src={src} className={className} {...props} />;
};
