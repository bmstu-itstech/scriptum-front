import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { blueprintsApi } from '@/shared/api/BlueprintsClient';
import type { Blueprint } from '@/shared/api/generated/data-contracts';

export const useSearchScripts = (name: string, options?: Partial<UseQueryOptions<Blueprint[]>>) => {
	return useQuery({
		...options,
		queryKey: ['searchScripts', name],
		queryFn: async () => {
			const response = await blueprintsApi.searchBlueprints({ name });
			return response.data;
		},
	});
};
