import type {ScriptParametrWithTypeOfCard} from '@/layouts/ScriptParametrsLayout/components/ScriptParametrLayout/ScriptParametr.props';
import {useMemo, type FC} from 'react';
import styles from '@/layouts/ScriptParametrsLayout/components/ScriptParametrLayout/ScriptParametrLayout.module.css';
export const ScriptParametrLayout: FC<ScriptParametrWithTypeOfCard> = ({
  typeOfCard,
  type,
  title,
  translation,
  measure,
}) => {
  const ScriptParametrInput = useMemo(() => {
    return (
      <div className={styles.ScriptParametrLayout}>
        <div className={styles.ScriptParametrLayout__info_input}>
          <p className={styles.ScriptParametrLayout__title_input}>{title}</p>
          <div className={styles.ScriptParametrLayout__type_measure_input}>
            <p className={styles.ScriptParametrLayout__type_input}>{type}</p>
            <p className={styles.ScriptParametrLayout__measure_input}>{measure}</p>
          </div>
        </div>
        <input
          className={styles.ScriptParametrLayout__input_input}
          type='text'
          name='inputParametr'
        />
        <p className={styles.ScriptParametrLayout__translation_input}>{translation}</p>
      </div>
    );
  }, []);

  const ScriptParametrOutput = useMemo(() => {
    return (
      <div className={styles.ScriptParametrLayout}>
        <div className={styles.ScriptParametrLayout__info_input}>
          <p className={styles.ScriptParametrLayout__title_input}>{title}</p>
          <div className={styles.ScriptParametrLayout__type_measure_input}>
            <p className={styles.ScriptParametrLayout__type_input}>{type}</p>
            <p className={styles.ScriptParametrLayout__measure_input}>{measure}</p>
          </div>
        </div>
        <input
          readOnly
          className={styles.ScriptParametrLayout__input_input}
          type='text'
          name='inputParametr'
        />
        <p className={styles.ScriptParametrLayout__translation_input}>{translation}</p>
      </div>
    );
  }, []);
  return typeOfCard == 'input' ? ScriptParametrInput : ScriptParametrOutput;
};
