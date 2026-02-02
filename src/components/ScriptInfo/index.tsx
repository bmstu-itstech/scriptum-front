import { ScriptInfoProps } from '@/components/ScriptInfo/ScriptInfo.props';
import type { FC } from 'react';
import cn from 'classnames';
import styles from '@/components/ScriptInfo/ScriptInfo.module.css';
import { getDate } from '@/utils/getRowFromDate';

export const ScriptInfo: FC<ScriptInfoProps> = ({
  name,
  desc,
  ownerName,
  createdAt,
  className,
  ...props
}) => {
  return (
    <div className={cn(className, styles.ScriptInfo)} {...props}>
      <h1 className={cn(styles.ScriptInfo__title, 'layout__title')}>{name}</h1>
      <h2 className={cn(styles.ScriptInfo__subtitle, 'layout__subtitle')}>{desc ?? ''}</h2>
      <div className={styles.ScriptInfo__info}>
        <p className={styles.ScriptInfo__author}>Автор: {ownerName}</p>
        <p className={styles.ScriptInfo__date}>Создан {getDate(createdAt, true)}</p>
      </div>
    </div>
  );
};
