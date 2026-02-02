import type { Props } from '@/shared/Container/Container.props';
import type { FC } from 'react';
import styles from '@/shared/Container/Container.module.css';
import cn from 'classnames';

export const Container: FC<Props> = ({ children, className, ...props }) => {
  return (
    <div className={cn(styles.container, className)} {...props}>
      {children}
    </div>
  );
};
