import { getCookie } from '@/utils/getCookie';

const ENV_API_URL = 'NEXT_PUBLIC_API_URL';

function getApiBaseUrl(): string {
  const url = process.env[ENV_API_URL];
  if (!url || url.trim() === '') {
    throw new Error(
      `${ENV_API_URL} не задан! Добавьте его в .env, например: ${ENV_API_URL}=https://your-api-host/api/v2/`,
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
