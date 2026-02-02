import { getCookie } from '@/utils/getCookie';

function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url || url.trim() === '') {
    throw new Error(
      'NEXT_PUBLIC_API_URL не задан! Добавьте его в .env, например: NEXT_PUBLIC_API_URL=https://your-api-host/api/v2/',
    );
  }
  return url;
}

export function createApiConfig() {
  return {
    baseURL: getApiBaseUrl(),
    withCredentials: true,
    securityWorker: async () => {
      const token = getCookie('access_token');
      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      };
    },
  };
}
