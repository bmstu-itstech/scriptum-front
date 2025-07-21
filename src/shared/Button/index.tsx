import type {Props} from '@/shared/Button/Button.props';
import type {FC} from 'react';
import cn from 'classnames';
import styles from '@/shared/Button/Button.module.css';
import {RunningStatusIcon} from '@/components/icons/RunningStatusIcon';

export const Button: FC<Props> = ({isLoading, icon, className, children, ...props}) => {
  return (
    <button className={cn(className, styles.btn)} {...props}>
      {isLoading ? <RunningStatusIcon /> : icon}
      {children}
    </button>
  );
};
