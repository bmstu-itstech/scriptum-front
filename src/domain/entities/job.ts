export interface IJobIn {
  type: string;
  data: string;
}

export interface IJobOut {
  type: string;
  data: string;
}

export interface IJob {
  job_id: number;
  user_id: number;
  in: IJobIn[];
  command: string;
  started_at: Date;
}

export interface IJobResult {
  job: IJob;
  code: number;
  out: IJobOut[];
  error_message: string;
}
