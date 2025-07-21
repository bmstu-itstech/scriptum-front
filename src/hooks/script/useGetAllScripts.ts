import {useQuery} from '@tanstack/react-query';
import { scriptsList } from '@/shared/api/script/getAllScripts';

export const useGetAllScripts = () => {
  const {
    data: accessData,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ['scripts'],
    queryFn: scriptsList,
  });

  return {accessData, isLoading, refetch, error};
};
