import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { searchScriptsList } from '@/shared/api/script/getSearchScripts';
import type { IScript } from '@/domain/entities/script';

export const useSearchScripts = (name: string, options?: Partial<UseQueryOptions<IScript[]>>) => {
  return useQuery({
    ...options,
    queryKey: ['searchScripts', name],
    queryFn: () => searchScriptsList(name),
  });
};
