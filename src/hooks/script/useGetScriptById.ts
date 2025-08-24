import { useQuery } from '@tanstack/react-query';
import { getScriptById } from '@/shared/api/script/getScriptById';

export const useGetScriptById = (id: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getScript', id],
    queryFn: () => getScriptById(id),
  });

  return { data, isLoading, error };
};
