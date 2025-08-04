import Image from 'next/image';
import src from '@/assets/icons/addParametrIcon.svg';
import type {FC} from 'react';
import {Props} from '@/components/icons/AddParametricon/AddParametrIcon.props';
export const AddParametrIcon: FC<Props> = ({className, ...props}) => {
  return <Image alt='AddParametrIcon' src={src} className={className} {...props} />;
};
