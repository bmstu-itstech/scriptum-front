import { Files } from '@/shared/api/generated/Files';
import { getCookie } from '@/utils/getCookie';

export const filesApi = new Files({
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
