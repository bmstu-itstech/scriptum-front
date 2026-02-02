import { useMutation } from '@tanstack/react-query';
import { blueprintsApi } from '@/shared/api/BlueprintsClient';
import type { AxiosError } from 'axios';
import type { PlainError } from '@/shared/api/generated/data-contracts';

export const useDeleteScript = () => {
  const { data, isPending, error, mutate } = useMutation<void, AxiosError<PlainError>, string>({
    mutationKey: ['deleteScript'],
    mutationFn: async (id: string) => {
      await blueprintsApi.deleteBlueprint(id);
    },
  });

  return { data, isPending, error, mutate };
};
