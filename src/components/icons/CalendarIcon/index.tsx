import Image from 'next/image';
import src from '@/assets/icons/calendar.svg';
import type { FC } from 'react';
import { Props } from '@/components/icons/CalendarIcon/CalendarIcon.props';

export const CalendarIcon: FC<Props> = ({ className, ...props }) => {
  return <Image alt='CalendarIcon' src={src} className={className} {...props} />;
};
