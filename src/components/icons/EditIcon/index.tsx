import type { FC } from 'react';
import type { Props } from '@/components/icons/EditIcon/EditIcon.props';

export const EditIcon: FC<Props> = ({ className, ...props }) => {
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
        d='M8.33325 13.3334H14.3333'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11.3333 2.33328C11.5985 2.06806 11.9582 1.91907 12.3333 1.91907C12.519 1.91907 12.7029 1.95565 12.8744 2.02672C13.046 2.09779 13.2019 2.20196 13.3333 2.33328C13.4646 2.4646 13.5687 2.6205 13.6398 2.79208C13.7109 2.96367 13.7475 3.14756 13.7475 3.33328C13.7475 3.519 13.7109 3.7029 13.6398 3.87448C13.5687 4.04606 13.4646 4.20196 13.3333 4.33328L4.99992 12.6666L2.33325 13.3333L2.99992 10.6666L11.3333 2.33328Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
