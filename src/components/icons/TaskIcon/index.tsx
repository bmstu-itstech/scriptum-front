import Image from 'next/image';
import { FC } from "react";
import src from '@/assets/icons/taskIcon.svg';
import { Props } from './TaskIcon.props';

export const TaskIcon: FC<Props> = ({ width, height, className, ...props }) => {
	return <Image alt='TaskIcon' src={src} className={className} {...props} width={width} height={height} />;
};
