import { IJobStatus, type IJob, type IJobResult } from '@/domain/entities/job';
import { ParametrType } from '@/shared/consts/parametr';
import { PipelineStatus } from '@/shared/consts/pipeline';

export const getSendValues = (value: string) => {
  switch (value) {
    case ParametrType.FLOAT:
      return 'real';
    case ParametrType.INT:
      return 'integer';
    case ParametrType.COMP:
      return 'complex';
  }
  return 'error';
};

export const getStatus = (status: IJobStatus, code: number | undefined) => {
  switch (status) {
    case IJobStatus.RUNNING:
      return PipelineStatus.RUNNING;
    case IJobStatus.FINISHED:
      if (code != 0) {
        return PipelineStatus.ERROR;
      }
      return PipelineStatus.OK;
    case IJobStatus.PENDING:
      return PipelineStatus.PENDING;
    default:
      return PipelineStatus.ERROR;
  }
};

export const getInputText = (job: IJob) => {
  let res = '';
  const minn_length = Math.min(job.in.length, job.expected.length);
  for (let i = 0; i < minn_length; i++) {
    res += job.expected[i].name + ': ' + job.in[i].data + '\n';
  }
  return res;
};

export const getOutputText = (pipeline: IJobResult) => {
  let res = '';
  const minn_length = Math.min(
    pipeline.out ? pipeline.out.length : 100,
    pipeline.job.expected.length,
  );
  if (pipeline.out) {
    for (let i = 0; i < minn_length; i++) {
      res += pipeline.job.expected[i].name + ': ' + pipeline.out[i].data;
    }
  }

  return res;
};
