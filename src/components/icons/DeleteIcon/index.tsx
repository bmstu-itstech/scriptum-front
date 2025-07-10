import Image from 'next/image';
import src from '@/assets/icons/deleteIcon.svg';
import type {FC} from 'react';
import { Props } from '@/components/icons/DeleteIcon/DeleteIcon.props';

export const DeleteIcon: FC<Props> = ({className, ...props}) => {
  return <Image alt='DeleteIcon' src={src} className={className} {...props} />;
};
