import { Blueprints } from '@/shared/api/generated/Blueprints';
import { getCookie } from '@/utils/getCookie';

export const blueprintsApi = new Blueprints({
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
