import Image from 'next/image';
import src from '@/assets/icons/personIcon.svg';
import type { FC } from 'react';
import { Props } from '@/components/icons/PersonIcon/PersonIcon.props';

export const PersonIcon: FC<Props> = ({ className, ...props }) => {
  return <Image alt='PersonIcon' src={src} className={className} {...props} />;
};
