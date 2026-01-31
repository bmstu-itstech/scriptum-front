import { Auth } from '@/shared/api/generated/Auth';
import { getCookie } from '@/utils/getCookie';

export const authApi = new Auth({
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
