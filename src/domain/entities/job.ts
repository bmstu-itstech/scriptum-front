import type { IScriptBit } from '@/domain/entities/script';

export interface IJobError {
  message: string;
}
export interface IJobIn {
  type: string;
  data: string;
}

export interface IJobOut {
  type: string;
  data: string;
}

export enum IJobStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  FINISHED = 'finished',
}

export interface IJob {
  job_id: number;
  user_id: number;
  script_id: number;
  in: IJobIn[];
  expected: IScriptBit[];
  path: string;
  status: IJobStatus;
  created_at: string;
  script_name: string;
  need_to_notify: boolean;
  finished_at: string;
}

export interface IJobResult {
  job: IJob;
  code?: number;
  out?: IJobOut[];
  error_message?: string;
}
