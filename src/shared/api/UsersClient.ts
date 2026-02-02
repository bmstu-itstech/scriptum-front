import { Users } from '@/shared/api/generated/Users';
import { createApiConfig } from '@/shared/api/createApiConfig';

export const usersApi = new Users(createApiConfig());
