import Image from 'next/image';
import src from '@/assets/icons/closeEyeIcon.svg';
import type { FC } from 'react';
import { Props } from '@/components/icons/CloseEyeIcon/CloseEyeIcon.props';

export const CloseEyeIcon: FC<Props> = ({ className, ...props }) => {
  return <Image alt='CloseEyeIcon' src={src} className={className} {...props} />;
};
