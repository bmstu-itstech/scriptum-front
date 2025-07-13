import { Props } from '@/layouts/ScriptParametrsLayout/ScriptParametrsLayout.props';
import type {FC} from 'react';
import cn from 'classnames';
import styles from '@/layouts/ScriptParametrsLayout/ScriptParametrsLayout.module.css'

export const ScriptParametrsLayout: FC<Props> = ({
  header,
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn(className, styles.ScriptParametrsLayout)} {...props}>
      <div className={styles.ScriptParametrsLayout__header}>{header}</div>
      <div className={styles.ScriptParametrsLayout__content}>{children}</div>
    </div>
  );
};
