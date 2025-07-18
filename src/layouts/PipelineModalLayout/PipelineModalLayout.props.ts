import type { HTMLAttributes } from 'react';
import { PipelineStatus } from '@/shared/consts/pipeline';

export default interface Props extends HTMLAttributes<HTMLDivElement> {
    isOpen:boolean;
    onClose: () => void;
    status: PipelineStatus;
    title: string;
    subtitle: string;
    timeStart: string;
    duration: string;
    input: string;
    output: string;
}


