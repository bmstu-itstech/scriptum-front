import {useQuery} from '@tanstack/react-query';
import {searchScriptsList} from '@/shared/api/script/getSearchScripts';

export const useSearchScripts = (name: string) => {
  const {
    data: accessData,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ['searchScripts'],
    queryFn: () => searchScriptsList(name),
  });

  return {accessData, isLoading, refetch, error};
};
