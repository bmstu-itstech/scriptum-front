import Image from 'next/image';
import src from '@/assets/icons/editIcon.svg';
import type {FC} from 'react';
import type {Props} from '@/components/icons/EditIcon/EditIcon.props';

export const EditIcon: FC<Props> = ({className, ...props}) => {
  return <Image alt='EditIcon' src={src} className={className} {...props} />;
};
