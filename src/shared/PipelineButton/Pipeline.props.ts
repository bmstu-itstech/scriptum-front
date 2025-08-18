import { PipelineStatus } from '@/shared/consts/pipeline';
import { HTMLAttributes } from 'react';

export default interface Props extends HTMLAttributes<HTMLDivElement> {
  status: PipelineStatus;
}
