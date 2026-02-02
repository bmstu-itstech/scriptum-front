import Image from 'next/image';
import src from '@/assets/icons/loginIcon.svg';
import type { FC } from 'react';
import { Props } from '@/components/icons/LoginIcon/LoginIcon.props';
export const LoginIcon: FC<Props> = ({ className, ...props }) => {
  return <Image alt='LoginIcon' src={src} className={className} {...props} />;
};
