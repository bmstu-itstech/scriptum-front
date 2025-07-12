import Image from 'next/image';
import { FC } from 'react';
import src from '@/assets/icons/logoutIcon.svg';
import { Props } from './LogoutIcon.props';

export const LogoutIcon: FC<Props> = ({ className, ...props }) => {
	return <Image alt='LogoutIcon' src={src} className={className} {...props} />;
};
