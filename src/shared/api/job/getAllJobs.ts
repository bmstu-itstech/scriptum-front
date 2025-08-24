import { client } from '../axios';
import type { IJobResult } from '@/domain/entities/job';

const jobsList: () => Promise<IJobResult[]> = async () => {
  const res = await client.get(`/jobs`);
  if (res.status >= 300) {
    throw new Error();
  }
  return res.data;
};

export { jobsList };
