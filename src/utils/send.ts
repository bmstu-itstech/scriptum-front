import { ParametrType } from '@/shared/consts/parametr';
import { PipelineStatus } from '@/shared/consts/pipeline';
import { JobState } from '@/shared/api/generated/data-contracts';
import type { Job } from '@/shared/api/generated/data-contracts';

export const getSendValues = (value: string) => {
  switch (value) {
    case ParametrType.FLOAT:
      return 'real';
    case ParametrType.INT:
      return 'integer';
    case ParametrType.STR:
      return 'string';
  }
  return 'error';
};

export const getStatus = (state: JobState, code: number | undefined) => {
  switch (state) {
    case JobState.Running:
      return PipelineStatus.RUNNING;
    case JobState.Finished:
      if (code !== 0) {
        return PipelineStatus.ERROR;
      }
      return PipelineStatus.OK;
    case JobState.Pending:
      return PipelineStatus.PENDING;
    default:
      return PipelineStatus.ERROR;
  }
};

export const getInputText = (job: Job) => {
  let res = '';
  const len = Math.min(job.input.length, job.in.length);
  for (let i = 0; i < len; i++) {
    res += job.in[i].name + ': ' + (job.input[i].value || '') + '\n';
  }
  return res;
};

export const getOutputText = (job: Job) => {
  let res = '';
  const len = Math.min(job.output.length, job.out.length);
  for (let i = 0; i < len; i++) {
    res += job.out[i].name + ': ' + (job.output[i].value || '');
    if (i < len - 1) {
      res += '\n';
    }
  }
  return res;
};
