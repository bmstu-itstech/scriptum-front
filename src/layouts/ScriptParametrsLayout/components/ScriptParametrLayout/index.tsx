import type { ScriptParametrWithTypeOfCard } from '@/layouts/ScriptParametrsLayout/components/ScriptParametrLayout/ScriptParametr.props';
import { useMemo, type FC } from 'react';
import styles from '@/layouts/ScriptParametrsLayout/components/ScriptParametrLayout/ScriptParametrLayout.module.css';
import cn from 'classnames';
import InputLayout from '@/layouts/InputLayout';
import { FastField, type FastFieldProps } from 'formik';

export const ScriptParametrLayout: FC<ScriptParametrWithTypeOfCard> = ({
  typeOfCard,
  type,
  name,
  description,
  formikName,
  unit,
}) => {
  const ScriptParametrInput = useMemo(() => {
    return (
      <div className={styles.ScriptParametrLayout}>
        <div className={styles.ScriptParametrLayout__info_input}>
          <p className={styles.ScriptParametrLayout__title_input}>{name}</p>
          <div className={styles.ScriptParametrLayout__type_measure_input}>
            <p className={styles.ScriptParametrLayout__type_input}>{type}</p>
            <p className={styles.ScriptParametrLayout__measure_input}>{unit}</p>
          </div>
        </div>
        <FastField name={formikName || ''}>
          {({ field, form, meta }: FastFieldProps) => (
            <InputLayout
              type='text'
              placeholder='Введите значение'
              {...field}
              value={field.value ?? ''}
              errorText={meta.touched && meta.error ? meta.error : null}
            />
          )}
        </FastField>
        <p className={styles.ScriptParametrLayout__translation_input}>{description}</p>
      </div>
    );
  }, []);

  const ScriptParametrOutput = useMemo(() => {
    return (
      <div className={cn(styles.ScriptParametrLayout, styles.ScriptParametrLayout__output)}>
        <div className={styles.ScriptParametrLayout__info_input}>
          <p className={'layout__title-xs'}>{name}</p>
          <div className={styles.ScriptParametrLayout__type_measure_input}>
            <p className={styles.ScriptParametrLayout__type_input}>{type}</p>
            <p className={styles.ScriptParametrLayout__measure_input}>{unit}</p>
          </div>
        </div>
        <p className={styles.ScriptParametrLayout__translation_input}>{description}</p>
      </div>
    );
  }, []);
  return typeOfCard == 'input' ? ScriptParametrInput : ScriptParametrOutput;
};
