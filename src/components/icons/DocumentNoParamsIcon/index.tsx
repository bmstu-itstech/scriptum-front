import Image from 'next/image';
import src from '@/assets/icons/documentNoParams.svg';
import type { FC } from 'react';
import { Props } from './DocumentNoParamsIcon.props';

export const DocumentNoParamsIcon: FC<Props> = ({ className, ...props }) => {
  return <Image alt='documentNoParamsIcon' src={src} className={className} {...props} />;
};
