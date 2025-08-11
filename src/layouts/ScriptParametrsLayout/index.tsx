'use client';
import { Props } from '@/layouts/ScriptParametrsLayout/ScriptParametrsLayout.props';
import { type FC  } from 'react';
import cn from 'classnames';
import styles from '@/layouts/ScriptParametrsLayout/ScriptParametrsLayout.module.css';
export const ScriptParametrsLayout: FC<Props> = ({
  header,
  headerClassname,
  className,
  children,
  ...props
}) => {
  
  return (
    <div className={cn(className, styles.ScriptParametrsLayout)} {...props}>
      <div className={cn(styles.ScriptParametrsLayout__header, headerClassname)}>{header}</div>
      {children}
    </div>
  );
};
