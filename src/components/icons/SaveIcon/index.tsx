import Image from 'next/image';
import src from '@/assets/icons/saveIcon.svg';
import type { FC } from 'react';
import { Props } from '@/components/icons/SaveIcon/SaveIcon.props';

export const SaveIcon: FC<Props> = ({ className, ...props }) => {
	return <Image alt='SaveIcon' src={src} className={className} {...props} />;
};
