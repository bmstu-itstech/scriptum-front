import { Users } from '@/shared/api/generated/Users';
import { getCookie } from '@/utils/getCookie';

export const usersApi = new Users({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  securityWorker: async () => {
    const token = getCookie('access_token');
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  },
});
