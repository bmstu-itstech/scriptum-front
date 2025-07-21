import {useQuery} from '@tanstack/react-query';
import {startScript} from '@/shared/api/script/startScript';

export const useStartScript = (id: number) => {
  const {
    data: accessData,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ['startScript', id.toString()],
    queryFn: () => startScript(id),
  });

  return {accessData, isLoading, refetch, error};
};
