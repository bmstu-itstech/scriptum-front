import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { blueprintsApi } from '@/shared/api/BlueprintsClient';
import type { Blueprint } from '@/shared/api/generated/data-contracts';

export const useGetAllScripts = (options?: Partial<UseQueryOptions<Blueprint[]>>) => {
  const { data, isLoading, refetch, error } = useQuery({
    ...options,
    queryKey: ['scripts'],
    queryFn: async () => {
      const response = await blueprintsApi.getBlueprints();
      return response.data;
    },
  });

  return { data, isLoading, refetch, error };
};
