import { type IScriptSend } from '@/domain/entities/script';
import { client } from '../axios';

const createScript: (values: IScriptSend) => Promise<IScriptSend> = async (values) => {
  const res = await client.post(`/scripts`, values);
  if (res.status >= 300) {
    throw new Error();
  }
  return res.data;
};

export { createScript };
