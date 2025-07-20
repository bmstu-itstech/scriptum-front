import Image from 'next/image';
import { FC } from 'react';
import src from '@/assets/icons/createUserIcon.svg';
import { Props } from './CreateUserIcon.props';

export const CreateUserIcon: FC<Props> = ({ className, ...props }) => {
	return <Image alt='CreateUserIcon' src={src} className={className} {...props} />;
};
