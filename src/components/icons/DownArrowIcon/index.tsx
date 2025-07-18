import Image from 'next/image';
import src from '@/assets/icons/arrowMore.svg';
import type {FC} from 'react';
import {Props} from '@/components/icons/DownArrowIcon/DownArrowIcon.props';
export const DownArrowIcon: FC<Props> = ({className, ...props}) => {
  return <Image alt='DownArrowIcon' src={src} className={className} {...props} />;
};
