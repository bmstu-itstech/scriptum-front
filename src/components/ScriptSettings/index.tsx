import { ScriptSettingsUsecase } from '@/components/ScriptSettings/ScriptSettings.usecase';
import styles from '@/components/ScriptSettings/ScriptSettings.module.css';
import cn from 'classnames';
import { memo, type FC } from 'react';
import { Props } from '@/components/ScriptSettings/ScriptSettings.props';
import { FastField, type FastFieldProps } from 'formik';

export const ScriptSettings: FC<Props> = memo(() => {
  return (
    <FastField name={'notify_by_email'}>
      {({ field }: FastFieldProps) => (
        <div className={styles.ScriptSettings}>
          <h1 className={cn(styles.ScriptSettings__title, 'layout__title-sm')}>
            {ScriptSettingsUsecase.title}
          </h1>
          <div className={styles.ScriptSettings__content}>
            {ScriptSettingsUsecase.settings.map((item, id) => {
              return (
                <div className={styles.ScriptSettings__bit} key={id}>
                  <input id={item.title} className={styles.ScriptSettings__input} type={item.type} {...field} />
                  <label htmlFor={item.title} className={styles.ScriptSettings__bit__title}>
                    {item.title}
                  </label>
                </div>
              );
            })}
          </div>
          <h2 className={cn(styles.ScriptSettings__subtitle, 'layout__subtitle')}>
            {ScriptSettingsUsecase.subtitle}
          </h2>
        </div>
      )}
    </FastField>

  );
});
