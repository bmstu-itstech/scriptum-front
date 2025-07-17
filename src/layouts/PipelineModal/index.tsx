import React, { FC } from 'react';
import Props from './PipelineModal.props';
import style from './PipelineModal.module.css';
import cn from 'classnames';
import { PipelineStatus } from '@/shared/consts/pipeline';
import { PipelineButton } from '@/shared/PipelineButton';

const getResultTitle = (status: PipelineStatus) => {
    switch (status) {
        case PipelineStatus.OK:
        case PipelineStatus.RUNNING:
            return 'Результат выполнения';
        case PipelineStatus.ERROR:
            return 'Ошибка';        
    }
};

export const PipelineModal: FC<Props> = ({ 
    status,
    title, 
    subtitle, 
    className, 
    timeStart, 
    duration, 
    input,
    output,
    ...props
}) => {
    const button = <PipelineButton status={status} />;
    const resultTitle = getResultTitle(status);

    return (
        <div className={cn(style.container, className)} {...props}>
            <div className={cn(style.head)}>
                <div className={cn(style.buttonContainer)}>
                    {button}
                </div>
                <div className={cn(style.info)}>
                    <p className={cn(style.info__title)}>{title}</p>
                    <p className={cn(style.info__subtitle)}>{subtitle}</p>
                </div>
            </div>
            <div className={cn(style.body)}>
                <div className={cn(style.timing)}>
                    <div className={cn(style.timeStart)}>
                        <p className={cn(style.timeStart__title)}>Время запуска</p>
                        <p className={cn(style.timeStart__content)}>{timeStart}</p>
                    </div>
                    <div className={cn(style.duration)}>
                        <p className={cn(style.duration__title)}>Длительность</p>
                        <p className={cn(style.duration__content)}>{duration}</p>
                    </div>                    
                </div>
                <div className={cn(style.inParams)}>
                    <p className={cn(style.inParams__title)}>Параметры запуска</p>
                    <p className={cn(style.inParams__content)}>{input}</p>
                </div>
                <div className={cn(style.outParams)}>
                    <p className={cn(style.outParams__title)}>{resultTitle}</p>
                    <p className={cn(style.outParams__content)}>{output}</p>
                </div>
            </div>
        </div>
    );
}
