import { Jobs } from '@/shared/api/generated/Jobs';
import { getCookie } from '@/utils/getCookie';

export const jobsApi = new Jobs({
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
