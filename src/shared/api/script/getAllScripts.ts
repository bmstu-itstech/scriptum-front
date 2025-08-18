import { IScript } from '@/domain/entities/script';
import { client } from '../axios';

const scriptsList: () => Promise<IScript[]> = async () => {
  const res = await client.get(`/scripts`);
  if (res.status >= 300) {
    throw new Error();
  }
  return res.data;
};

export { scriptsList };
