import { memo, type FC } from 'react';
import { Props } from '@/components/ScriptSettings/ScriptSettings.props';
import { FastField, type FastFieldProps } from 'formik';
import styles from '@/components/ScriptSettings/ScriptSettings.module.css';
import cn from 'classnames';
import { ScriptSettingsUsecase } from '@/components/ScriptSettings/ScriptSettings.usecase';

const ScriptSettingsComponent: FC<Props> = () => {
  return (
    <FastField name={'notify_by_email'}>
      {({ field }: FastFieldProps) => (
        <div className={styles.ScriptSettings}>
          <h1 className={cn(styles.ScriptSettings__title, 'layout__title-sm')}>
            {ScriptSettingsUsecase.title}
          </h1>
          <div className={styles.ScriptSettings__content}>
            {ScriptSettingsUsecase.settings.map((item, id) => (
              <div className={styles.ScriptSettings__bit} key={id}>
                <input
                  id={item.title}
                  className={styles.ScriptSettings__input}
                  type={item.type}
                  {...field}
                />
                <label htmlFor={item.title} className={styles.ScriptSettings__bit__title}>
                  {item.title}
                </label>
              </div>
            ))}
          </div>
          <h2 className={cn(styles.ScriptSettings__subtitle, 'layout__subtitle')}>
            {ScriptSettingsUsecase.subtitle}
          </h2>
        </div>
      )}
    </FastField>
  );
};

export const ScriptSettings = memo(ScriptSettingsComponent);
ScriptSettings.displayName = 'ScriptSettings';
