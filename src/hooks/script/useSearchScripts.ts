import { useQuery } from '@tanstack/react-query';
import { searchScriptsList } from '@/shared/api/script/getSearchScripts';

export const useSearchScripts = (name: string) => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['searchScripts', name],
    queryFn: () => searchScriptsList(name),
  });

  return { data, isLoading, refetch, error };
};
