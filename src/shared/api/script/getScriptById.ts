import { IScript } from '@/domain/entities/script';
import { client } from '../axios';

const getScriptById: (id: number) => Promise<IScript> = async (id: number) => {
  const res = await client.get(`/scripts/${id}`);
  if (res.status >= 300) {
    throw new Error();
  }
  return res.data;
};

export { getScriptById };
