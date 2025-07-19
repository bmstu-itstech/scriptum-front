import Image from 'next/image';
import src from '@/assets/icons/galka.svg';
import type {FC} from 'react';
import {Props} from '@/components/icons/GalkaIcon/GalkaIcon.props';
export const GalkaIcon: FC<Props> = ({className, ...props}) => {
  return <Image alt='GalkaIcon' src={src} className={className} {...props} />;
};
