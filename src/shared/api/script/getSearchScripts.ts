import {IScript} from '@/domain/entities/script';
import {client} from '../axios';

const searchScriptsList: (name: string) => Promise<IScript[]> = async (name: string) => {
  const res = await client.get(`/scripts/search?script_name=${name}`);
  if (res.status >= 300) {
    throw new Error();
  }
  return res.data;
};

export {searchScriptsList};
