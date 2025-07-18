import Image from 'next/image';
import src from '@/assets/icons/arrowLess.svg';
import type {FC} from 'react';
import {Props} from '@/components/icons/UpArrowIcon/UpArrowIcon.props';
export const UpArrowIcon: FC<Props> = ({className, ...props}) => {
  return <Image alt='UpArrowIcon' src={src} className={className} {...props} />;
};
