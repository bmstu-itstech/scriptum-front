import type { HTMLAttributes } from 'react';
import { PipelineStatus } from '@/shared/consts/pipeline';

export default interface Props extends HTMLAttributes<HTMLDivElement> {
  status: PipelineStatus;
  scriptNumber: string;
  scriptName: string;
  timeFinish?: string;
  timeStart: string;
  input: string;
  output: string;
}
