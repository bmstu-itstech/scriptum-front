import {ScriptSettingsUsecase} from '@/components/ScriptSettings/ScriptSettings.usecase';
import styles from '@/components/ScriptSettings/ScriptSettings.module.css';
import cn from 'classnames';
import type {FC} from 'react';
import {Props} from '@/components/ScriptSettings/ScriptSettings.props';

export const ScriptSettings: FC<Props> = () => {
  return (
    <div className={styles.ScriptSettings}>
      <h1 className={cn(styles.ScriptSettings__title, 'layout__title-sm')}>
        {ScriptSettingsUsecase.title}
      </h1>
      <div className={styles.ScriptSettings__content}>
        {ScriptSettingsUsecase.settings.map((item, id) => {
          return (
            <div className={styles.ScriptSettings__bit} key={id}>
              <input id={item.title} className={styles.ScriptSettings__input} type={item.type} />
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
  );
};
