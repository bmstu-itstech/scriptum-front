import {IUser} from '@/domain/entities/user';
import {client} from '../axios';

const getUser: (id: number) => Promise<IUser> = async (id: number) => {
  const res = await client.get(`/users/${id}`);
  if (res.status >= 300) {
    throw new Error();
  }
  return res.data;
};

export {getUser};
