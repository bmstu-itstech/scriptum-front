import { IScript } from '@/domain/entities/script';
import { client } from '../axios';

const updateScript: (id: number) => Promise<IScript> = async (id: number) => {
  const res = await client.put(`/scripts/${id}`);
  if (res.status >= 300) {
    throw new Error();
  }
  return res.data;
};

export { updateScript };
