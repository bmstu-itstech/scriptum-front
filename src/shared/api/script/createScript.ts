import {IScript} from '@/domain/entities/script';
import {client} from '../axios';

const createScript: () => Promise<IScript> = async () => {
  const res = await client.post(`/scripts`);
  if (res.status >= 300) {
    throw new Error();
  }
  return res.data;
};

export {createScript};
