import Image from 'next/image';
import src from '@/assets/icons/search.svg';
import type {FC} from 'react';
import { Props } from '@/components/icons/SearchIcon/SearchIcon.props';
export const SearchIcon: FC<Props> = ({className, ...props}) => {
  return <Image alt='SearchIcon' src={src} className={className} {...props} />;
};
