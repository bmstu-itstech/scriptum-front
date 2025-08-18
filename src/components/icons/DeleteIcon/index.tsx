import type { FC } from 'react';
import { Props } from '@/components/icons/DeleteIcon/DeleteIcon.props';

export const DeleteIcon: FC<Props> = ({ className, ...props }) => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      {...props}>
      <path
        d='M2.33325 4H14.3333'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.9998 4V13.3333C12.9998 14 12.3332 14.6667 11.6665 14.6667H4.99984C4.33317 14.6667 3.6665 14 3.6665 13.3333V4'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.6665 4.00004V2.66671C5.6665 2.00004 6.33317 1.33337 6.99984 1.33337H9.6665C10.3332 1.33337 10.9998 2.00004 10.9998 2.66671V4.00004'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7 7.33337V11.3334'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.6665 7.33337V11.3334'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
