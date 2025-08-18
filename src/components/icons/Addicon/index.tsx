import Image from 'next/image';
import src from '@/assets/icons/addIcon.svg';
import type { FC } from 'react';
import { Props } from '@/components/icons/Addicon/AddIcon.props';
export const AddIcon: FC<Props> = ({ className, ...props }) => {
  return <Image alt='AddIcon' src={src} className={className} {...props} />;
};
