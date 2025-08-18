import { IUser } from '@/domain/entities/user';
import { client } from '../axios';

const usersList: () => Promise<IUser[]> = async () => {
  const res = await client.get(`/users`);
  if (res.status >= 300) {
    throw new Error();
  }
  return res.data;
};

export { usersList };
