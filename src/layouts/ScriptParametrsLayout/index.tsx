'use client';
import {Props} from '@/layouts/ScriptParametrsLayout/ScriptParametrsLayout.props';
import {useCallback, type FC, useState} from 'react';
import cn from 'classnames';
import styles from '@/layouts/ScriptParametrsLayout/ScriptParametrsLayout.module.css';
import {UpArrowIcon} from '@/components/icons/UpArrowIcon';
import {DownArrowIcon} from '@/components/icons/DownArrowIcon';

export const ScriptParametrsLayout: FC<Props> = ({header, className, children, ...props}) => {
  const [countOfShown, setCountOfShown] = useState(4);
  const onShowMoreClick = useCallback(() => {
    setCountOfShown(children.length);
  }, []);
  const onShowLessClick = useCallback(() => {
    setCountOfShown(4);
  }, []);
  return (
    <div className={cn(className, styles.ScriptParametrsLayout)} {...props}>
      <div className={styles.ScriptParametrsLayout__header}>{header}</div>
      <div
        className={cn(styles.ScriptParametrsLayout__content, {
          [styles.expanded]: countOfShown > 4,
        })}>
        {children.slice(0, countOfShown)}
      </div>
      <div className={styles.ScriptParametrsLayout__btn}>
        {children.length > countOfShown ? (
          <button className={styles.ScriptParametrsLayout__extendBtn} onClick={onShowMoreClick}>
            <DownArrowIcon className={styles.ScriptParametrsLayout__extendBtn_btn} />
          </button>
        ) : (
          <button className={styles.ScriptParametrsLayout__extendBtn} onClick={onShowLessClick}>
            <UpArrowIcon className={styles.ScriptParametrsLayout__extendBtn_btn} />
          </button>
        )}
      </div>
    </div>
  );
};
