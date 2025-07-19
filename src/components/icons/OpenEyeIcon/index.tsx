import Image from 'next/image';
import src from '@/assets/icons/openEyeIcon.svg';
import type { FC } from 'react';
import { Props } from '@/components/icons/OpenEyeIcon/OpenEyeIcon.props';

export const OpenEyeIcon: FC<Props> = ({ className, ...props }) => {
	return <Image alt='OpenEyeIcon' src={src} className={className} {...props} />;
};
