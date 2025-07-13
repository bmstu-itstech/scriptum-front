import type {FC} from 'react';
import {Props} from '@/layouts/ScriptParametrsLayout/components/ShowMoreParametrs/ShowMoreParametrs.props';
import styles from '@/layouts/ScriptParametrsLayout/components/ShowMoreParametrs/ShowMoreParametrs.module.css'
import cn from 'classnames'

export const ShowMoreParametrs: FC<Props> = ({children, className, ...props}) => {
  return (
    <button className={cn(styles.main, className)} {...props}>
      {children}
    </button>
  );
};
