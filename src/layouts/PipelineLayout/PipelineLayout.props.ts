import type { HTMLAttributes } from 'react';
import { PipelineStatus } from '@/shared/consts/pipeline';

export default interface Props extends HTMLAttributes<HTMLDivElement> {
  status: PipelineStatus;
  scriptNumber: string;
  scriptName: string;
  timeStart: string;
  duration: string;
  input: string;
  output: string;
}
