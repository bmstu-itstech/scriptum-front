import Image from 'next/image';
import src from '@/assets/icons/saveScript.svg';
import type {FC} from 'react';
import {Props} from '@/components/icons/SaveScriptIcon/SaveScriptIcon.props';
export const SaveScriptIcon: FC<Props> = ({className, ...props}) => {
  return <Image alt='SaveScriptIcon' src={src} className={className} {...props} />;
};
