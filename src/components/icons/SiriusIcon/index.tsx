import Image from 'next/image';
import src from '@/assets/icons/siriusIcon.svg';
import type { FC } from 'react';
import { Props } from '@/components/icons/SiriusIcon/SiriusIcon.props';

export const SiriusIcon: FC<Props> = ({ width, height, className, ...props }) => {
	return <Image alt='SiriusIcon' src={src} className={className} width={width} height={height} {...props} />;
};
