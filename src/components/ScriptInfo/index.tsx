import { Props } from '@/components/ScriptInfo/ScriptInfo.props';
import type { FC } from 'react';
import cn from 'classnames';
import styles from '@/components/ScriptInfo/ScriptInfo.module.css';
import { getDate } from '@/utils/getRowFromDate';

export const ScriptInfo: FC<Props> = ({
  // script_id,
  script_name,
  script_description,
  // in_fields,
  // out_fields,
  // file_id,
  owner,
  // visibility,
  created_at,
  className,
  ...props
}) => {
  return (
    <div className={cn(className, styles.ScriptInfo)} {...props}>
      <h1 className={cn(styles.ScriptInfo__title, 'layout__title')}>{script_name}</h1>
      <h2 className={cn(styles.ScriptInfo__subtitle, 'layout__subtitle')}>{script_description}</h2>
      <div className={styles.ScriptInfo__info}>
        <p className={styles.ScriptInfo__author}>Автор: {owner}</p>
        <p className={styles.ScriptInfo__date}>Создан {getDate(created_at, true)}</p>
      </div>
    </div>
  );
};
