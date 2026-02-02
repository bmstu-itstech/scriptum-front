import { Jobs } from '@/shared/api/generated/Jobs';
import { createApiConfig } from '@/shared/api/createApiConfig';

export const jobsApi = new Jobs(createApiConfig());
