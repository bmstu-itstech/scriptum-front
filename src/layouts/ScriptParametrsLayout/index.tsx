import type {Props} from '@/components/ScriptParametrs/ScriptParametrs.props';
import type {FC} from 'react';
import cn from 'classnames';
import styles from '@/components/ScriptParametrs/ScriptParametrs.module.css';

export const ScriptParametrs: FC<Props> = ({
  type,
  header,
  params,
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
