import { Auth } from '@/shared/api/generated/Auth';
import { createApiConfig } from '@/shared/api/createApiConfig';

export const authApi = new Auth(createApiConfig());
