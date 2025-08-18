import Image from 'next/image';
import src from '@/assets/icons/loginLogoIcon.svg';
import type { FC } from 'react';
import { Props } from '@/components/icons/LoginLogoIcon/LoginLogoIcon.props';

export const LoginLogoIcon: FC<Props> = ({ className, ...props }) => {
  return <Image alt='LoginLogoIcon' src={src} className={className} {...props} />;
};
