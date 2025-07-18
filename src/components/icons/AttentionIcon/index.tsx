import Image from 'next/image';
import src from '@/assets/icons/attention.svg';
import type {FC} from 'react';
import {Props} from '@/components/icons/AttentionIcon/AttentionIcon.props';
export const AttentionIcon: FC<Props> = ({className, ...props}) => {
  return <Image alt='AttentionIcon' src={src} className={className} {...props} />;
};
