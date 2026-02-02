import { Files } from '@/shared/api/generated/Files';
import { createApiConfig } from '@/shared/api/createApiConfig';

export const filesApi = new Files(createApiConfig());
