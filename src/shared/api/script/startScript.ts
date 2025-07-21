import {IScriptStart} from '@/domain/entities/script';
import {client} from '../axios';

const startScript: (id: number) => Promise<IScriptStart> = async (id: number) => {
  const res = await client.post(`/scripts/${id}/start`);
  if (res.status >= 300) {
    throw new Error();
  }
  return res.data;
};

export {startScript};
