import { getCookie } from '@/utils/getCookie';

function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url || url.trim() === '') {
    throw new Error('Путь к API не задан! Добавьте его в переменную среду');
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
