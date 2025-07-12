import type {Props} from '@/components/ScriptsPanel/components/ScriptElement/ScriptElement.props';
import type {FC} from 'react';
import cn from 'classnames';
import styles from '@/components/ScriptsPanel/components/ScriptElement/ScriptElement.module.css';
import basicStyles from '@/components/ScriptsPanel/components/EmptyScript/EmptyScript.module.css';
import {Button} from '@/shared/Button';
import {RunIcon} from '@/components/icons/RunIcon';
import {getDate} from '@/utils/getRowFromDate';
import {TextWithIcon} from '@/shared/TextWithIcon';
import {PersonIcon} from '@/components/icons/PersonIcon';
import {CalendarIcon} from '@/components/icons/CalendarIcon';

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
    <div
      id={id.toString()}
      className={cn(className, styles.scriptElement, basicStyles.layout)}
      {...props}>
      <div className={styles.scriptElement__supblock}>
        <h2 className={styles.scriptElement__title}>{title}</h2>
        <p className={styles.scriptElement__runs}>Кол. запусков: {countOfRuns}</p>
      </div>

      <h3 className={styles.scriptElement__subtitle}>{subtitle}</h3>
      <div className={styles.scriptElement__info}>
        <TextWithIcon icon={<PersonIcon />} className={styles.scriptElement__author}>
          {author}
        </TextWithIcon>
        <TextWithIcon icon={<CalendarIcon />} className={styles.scriptElement__data}>
          {getDate(data)}
        </TextWithIcon>
      </div>
      <div className={styles.scriptElement__interactive}>
        <Button icon={<RunIcon />}>Запустить</Button>
      </div>
    </div>
  );
};
