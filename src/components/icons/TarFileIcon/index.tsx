import Image from 'next/image';
import src from '@/assets/icons/tarFile.svg';
import type { FC } from 'react';
import { Props } from '@/components/icons/TarFileIcon/TarFileIcon.props';

export const TarFileIcon: FC<Props> = ({ className, ...props }) => {
  return <Image alt='TarFileIcon' src={src} className={className} {...props} />;
};
