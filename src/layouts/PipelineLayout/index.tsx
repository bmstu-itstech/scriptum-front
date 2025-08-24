'use client';
import { FC, useEffect, useState } from 'react';
import Props from './PipelineLayout.props';
import style from './PipelineLayout.module.css';
import cn from 'classnames';
import { PipelineButton } from '@/shared/PipelineButton';
import { PipelineModalLayout } from '../PipelineModalLayout';
import { formatDuration } from '@/utils/getDiffTime';
import { getDate } from '@/utils/getRowFromDate';

export const PipelineLayout: FC<Props> = ({
  status,
  scriptNumber,
  scriptName,
  timeStart,
  timeFinish,
  input,
  output,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const statusButton = <PipelineButton status={status} />;
  const [duration, setDuration] = useState(
    formatDuration(timeStart, timeFinish ? timeFinish : new Date()),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(formatDuration(timeStart, timeFinish ? timeFinish : new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeStart, timeFinish]);

  return (
    <>
      <div className={cn(style.pipeline, className)} onClick={() => setIsOpen(true)} {...props}>
        <div className={cn(style.dataSection, style.number)}>
          <p className={style.title}>ID</p>
          <p className={style.content}>{scriptNumber}</p>
        </div>
        <div className={cn(style.dataSection, style.name)}>
          <p className={style.title}>Скрипт</p>
          <p className={style.content}>{scriptName}</p>
        </div>
        <div className={style.timeBlock}>
          <div className={cn(style.dataSection, style.time)}>
            <p className={style.title}>Время запуска</p>
            <p className={style.content}>{getDate(timeStart, true)}</p>
          </div>

          <div className={cn(style.dataSection, style.time)}>
            <p className={style.title}>Длительность</p>
            <p className={style.content}>{duration}</p>
          </div>
        </div>
        <div className={style.buttonSection}>{statusButton}</div>
      </div>

      <PipelineModalLayout
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        status={status}
        scriptNumber={scriptNumber}
        scriptName={scriptName}
        timeStart={getDate(timeStart, true)}
        duration={duration}
        input={input}
        output={output}
      />
    </>
  );
};
