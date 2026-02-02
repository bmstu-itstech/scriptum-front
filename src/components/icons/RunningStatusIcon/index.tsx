import type { FC } from 'react';
import { Props } from './RunningStatusIcon.props';
import style from './RunningStatusIcon.module.css';
import cn from 'classnames';

export const RunningStatusIcon: FC<Props> = ({ className, ...props }) => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn(style.loadingRotate, className)}
      {...props}>
      <path
        d='M14 7.99999C13.9999 9.26705 13.5988 10.5016 12.854 11.5266C12.1092 12.5516 11.059 13.3146 9.85392 13.7061C8.64886 14.0976 7.3508 14.0976 6.14576 13.706C4.94073 13.3144 3.89059 12.5514 3.14584 11.5263C2.4011 10.5012 1.99999 9.26671 2 7.99965C2.00001 6.73259 2.40114 5.49806 3.14589 4.47299C3.89065 3.44792 4.9408 2.68493 6.14584 2.29337C7.35088 1.90182 8.64895 1.9018 9.854 2.29332'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
