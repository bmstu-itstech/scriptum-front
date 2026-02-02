import { useMutation } from '@tanstack/react-query';
import { usersApi } from '@/shared/api/UsersClient';
import type { AxiosError } from 'axios';
import type { PlainError } from '@/shared/api/generated/data-contracts';

export const useDeleteUser = () => {
  const { data, isPending, error, mutate } = useMutation<void, AxiosError<PlainError>, string>({
    mutationKey: ['deleteUser'],
    mutationFn: async (id: string) => {
      await usersApi.deleteUser(id);
    },
  });

  return { data, isPending, error, mutate };
};
