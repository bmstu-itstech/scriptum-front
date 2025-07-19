import Image from 'next/image';
import src from '@/assets/icons/filterIcon.svg';
import type { FC } from 'react';
import { Props } from './FilterIcon.props'

export const FilterIcon: FC<Props> = ({ className, ...props }) => {
	return <Image alt='FilterIcon' src={src} className={className} {...props} />;
};
