import type {Props} from '@/layouts/ScriptParametrsLayout/components/ScriptParametrLayout/ScriptParametr.props';
import {useMemo, type FC} from 'react';
import cn from 'classnames';
import styles from '@/layouts/ScriptParametrsLayout/components/ScriptParametrLayout/ScriptParametrLayout.module.css';
export const ScriptParametrLayout: FC<Props> = ({
  typeOfCard,
  type,
  title,
  translation,
  measure,
}) => {
  const ScriptParametrInput = useMemo(() => {
    return (
      <div className={styles.ScriptParametrLayout}>
        <div className={styles.ScriptParametrLayout__info}>
          <p className={styles.ScriptParametrLayout__title}>{title}</p>
          <div className={styles.ScriptParametrLayout__type_measure}>
            <p className={styles.ScriptParametrLayout__type}>{type}</p>
            <p className={styles.ScriptParametrLayout__measure}>{measure}</p>
          </div>
        </div>
        <input className={styles.ScriptParametrLayout__input} type='text' name='inputParametr' />
        <p className={styles.ScriptParametrLayout__translation}>{translation}</p>
      </div>
    );
  }, []);

  const ScriptParametrOutput = useMemo(() => {
    return <div></div>;
  }, []);
  return typeOfCard == 'input' ? ScriptParametrInput : ScriptParametrOutput;
};
