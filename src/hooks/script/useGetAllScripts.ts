import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { scriptsList } from '@/shared/api/script/getAllScripts';
import type { IScript } from '@/domain/entities/script';

export const useGetAllScripts = (options?: Partial<UseQueryOptions<IScript[]>>) => {
  const { data, isLoading, refetch, error } = useQuery({
    ...options,
    queryKey: ['scripts'],
    queryFn: scriptsList,
  });

  return { data, isLoading, refetch, error };
};
