import { FC } from 'react';
import Props from './Pipeline.props';
import style from './Pipeline.module.css';
import cn from 'classnames';
import { PipelineStatus } from '@/shared/consts/pipeline';
import { OkayStatusIcon } from '@/components/icons/OkayStatusIcon';
import { ErrorStatusIcon } from '@/components/icons/ErrorStatusIcon';
import { RunningStatusIcon } from '@/components/icons/RunningStatusIcon';

const getStatusConfig = (status: PipelineStatus): [React.ReactNode, string] => {
    switch(status) {
        case PipelineStatus.OK:
            return [<OkayStatusIcon />, 'OK'];
        case PipelineStatus.ERROR:
            return [<ErrorStatusIcon />, 'Ошибка'];
        case PipelineStatus.RUNNING:
            return [<RunningStatusIcon />, 'Выполнение'];
    }
};

export const PipelineButton: FC<Props> = ({status, className, ...props}) => {
    const [icon, text] = getStatusConfig(status);

    return (
        <div className={cn(style.buttonContainer, className)} {...props}>
            <span className={cn(style.icon)}>
                {icon}
            </span>
            <p className={cn(style.text)}>
                {text}
            </p>
        </div>
    );
}