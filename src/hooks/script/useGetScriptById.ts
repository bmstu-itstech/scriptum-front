import { useQuery } from '@tanstack/react-query';
import { blueprintsApi } from '@/shared/api/BlueprintsClient';

export const useGetScriptById = (id: string | number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getScript', id],
    queryFn: async () => {
      const response = await blueprintsApi.getBlueprint(String(id));
      return response.data;
    },
  });

  return { data, isLoading, error };
};
