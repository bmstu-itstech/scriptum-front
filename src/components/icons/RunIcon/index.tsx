import Image from 'next/image';
import src from '@/assets/icons/runIcon.svg';
import type {FC} from 'react';
import {Props} from '@/components/icons/RunIcon/RunIcon.props';

export const RunIcon: FC<Props> = ({className, ...props}) => {
  return <Image alt='RunIcon' src={src} className={className} {...props} />;
};
