'use client';
import { Props } from '@/layouts/InfoBlockLayout/InfoBlockLayout.props';
import { memo, type FC } from 'react';
import cn from 'classnames';
import styles from '@/layouts/InfoBlockLayout/InfoBlockLayout.module.css';

export const InfoBlockLayout: FC<Props> = memo(
  ({ header, className, headerClassname, contentClassname, children, ...props }) => {
    return (
      <div className={cn(className, styles.ScriptParametrsLayout)} {...props}>
        <div className={cn(styles.ScriptParametrsLayout__header, headerClassname)}>{header}</div>
        <div className={cn(styles.ScriptParametrsLayout__content, contentClassname)}>
          {children}
        </div>
      </div>
    );
  },
);

InfoBlockLayout.displayName = 'InfoBlockLayout';
