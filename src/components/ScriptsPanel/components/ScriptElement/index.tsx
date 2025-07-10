import type {Props} from '@/components/ScriptsPanel/components/ScriptElement/ScriptElement.props';
import type {FC} from 'react';
import cn from 'classnames';
import styles from '@/components/ScriptsPanel/components/ScriptElement/ScriptElement.module.css';
import {Button} from '@/shared/Button';
import {RunIcon} from '@/components/icons/RunIcon';
import { getDate } from '@/utils/getRowFromDate';

export const ScriptElement: FC<Props> = ({
  className,
  title,
  id,
  countOfRuns,
  subtitle,
  author,
  data,
  ...props
}) => {
  return (
    <div className={cn(className, styles.scriptElement)} {...props}>
      <h2 className={styles.scriptElement__title}>{title}</h2>
      <p className={styles.scriptElement__runs}>{countOfRuns} запусков</p>
      <h3 className={styles.scriptElement__subtitle}>{subtitle}</h3>
      <div className={styles.scriptElement__info}>
        <p className={styles.scriptElement__author}>{author}</p>
        <p className={styles.scriptElement__data}>{getDate(data)}.</p>
      </div>
      <div className={styles.scriptElement__interactive}>
        <Button icon={<RunIcon />}>Запустить</Button>
      </div>
    </div>
  );
};
