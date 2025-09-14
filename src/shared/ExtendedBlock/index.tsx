import { useCallback, useEffect, useState, type FC } from 'react';
import { Props } from '@/shared/ExtendedBlock/ExtendedBlock.props';
import { DownArrowIcon } from '@/components/icons/DownArrowIcon';
import { UpArrowIcon } from '@/components/icons/UpArrowIcon';
import styles from '@/shared/ExtendedBlock/ExtendedBlock.module.css';
import cn from 'classnames';

export const ExtendedBlock: FC<Props> = ({
  children,
  contentClassname,
  innerContentClassname,
  mainExtendedClassname,
}) => {
  const [countOfShown, setCountOfShown] = useState(4);
  const [countOfChildren, setCountOfChildren] = useState(children.length);
  useEffect(() => {
    setCountOfChildren(children.length);
  }, [children.length]);

  const onShowMoreClick = useCallback(() => {
    setCountOfShown(countOfChildren);
  }, [countOfChildren]);
  const onShowLessClick = useCallback(() => {
    setCountOfShown(4);
  }, []);

  return (
    <>
      <div className={cn(styles.ExtendedBlock, mainExtendedClassname)}>
        <div className={cn(styles.ScriptParametrsLayout__content, contentClassname)}>
          {children.slice(0, 4)}
        </div>
        {countOfChildren > 4 && (
          <div
            className={cn(styles.ScriptParametrsLayout__content, contentClassname, {
              [styles.expanded]: countOfShown > 4,
            })}>
            <div
              className={cn(
                styles.ScriptParametrsLayout__content__children,
                innerContentClassname,
              )}>
              {children.slice(4)}
            </div>
          </div>
        )}
      </div>
      {countOfChildren > 4 ? (
        <div className={styles.ScriptParametrsLayout__btn}>
          {countOfChildren > countOfShown ? (
            <button
              title='showMore'
              type='button'
              className={styles.ScriptParametrsLayout__extendBtn}
              onClick={onShowMoreClick}>
              <DownArrowIcon className={styles.ScriptParametrsLayout__extendBtn_btn} />
            </button>
          ) : (
            <button
              title='showLess'
              type='button'
              className={cn(
                styles.ScriptParametrsLayout__extendBtn,
                styles.ScriptParametrsLayout__extendBtn__showLess,
              )}
              onClick={onShowLessClick}>
              <UpArrowIcon className={styles.ScriptParametrsLayout__extendBtn_btn} />
            </button>
          )}
        </div>
      ) : null}
    </>
  );
};
