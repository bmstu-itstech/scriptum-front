import { IScriptStart } from '@/domain/entities/script';
import { client } from '../axios';

const startScript: (value: IScriptStart, id: number) => Promise<IScriptStart> = async (
  value: IScriptStart,
  id: number,
) => {
  const res = await client.post(`/scripts/${id}/start`, value);
  if (res.status >= 300) {
    throw new Error();
  }
  return res.data;
};

export { startScript };
