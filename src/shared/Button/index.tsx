import type { Props } from '@/shared/Button/Button.props';
import type { FC } from 'react';
import cn from 'classnames';
import styles from '@/shared/Button/Button.module.css';
import { RunningStatusIcon } from '@/components/icons/RunningStatusIcon';

export const Button: FC<Props> = ({
  isLoading = false,
  icon,
  className,
  children,
  type = 'button',
  ...props
}) => {
  return (
    <button disabled={isLoading} className={cn(className, styles.btn)} type={type} {...props}>
      {isLoading ? <RunningStatusIcon /> : icon}
      {children}
    </button>
  );
};
