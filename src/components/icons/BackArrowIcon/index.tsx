import Image from 'next/image';
import src from '@/assets/icons/backArrow.svg';
import type {FC} from 'react';
import {Props} from '@/components/icons/BackArrowIcon/BackArrowIcon.props';
export const BackArrowIcon: FC<Props> = ({className, ...props}) => {
  return <Image alt='BackArrowIcon' src={src} className={className} {...props} />;
};
