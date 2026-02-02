import Image from 'next/image';
import { FC } from 'react';
import src from '@/assets/icons/uploadIcon.svg';
import { Props } from './UploadIcon.props';

export const UploadIcon: FC<Props> = ({ className, ...props }) => {
  return <Image alt='UploadIcon' src={src} className={className} {...props} />;
};
