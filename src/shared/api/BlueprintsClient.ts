import { Blueprints } from '@/shared/api/generated/Blueprints';
import { createApiConfig } from '@/shared/api/createApiConfig';

export const blueprintsApi = new Blueprints(createApiConfig());
