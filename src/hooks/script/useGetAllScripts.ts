import {useQuery} from '@tanstack/react-query';
import { scriptsList } from '@/shared/api/script/getAllScripts';

export const useGetAllScripts = () => {
  const {
    data,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ['scripts'],
    queryFn: scriptsList,
  });

  return {data, isLoading, refetch, error};
};
