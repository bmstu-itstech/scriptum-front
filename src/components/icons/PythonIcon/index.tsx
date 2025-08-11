import Image from 'next/image';
import src from '@/assets/icons/python.svg';
import type {FC} from 'react';
import { Props } from '@/components/icons/PythonIcon/PythonIcon.props';
export const PythonIcon: FC<Props> = ({className, ...props}) => {
  return <Image alt='PythonIcon' src={src} className={className} {...props} />;
};
