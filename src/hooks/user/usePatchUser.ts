import { useMutation } from '@tanstack/react-query';
import { usersApi } from '@/shared/api/UsersClient';
import type {
  PatchUserRequest,
  PatchUserResponse,
  InvalidInputError,
  PlainError,
} from '@/shared/api/generated/data-contracts';
import type { AxiosError } from 'axios';

export const usePatchUser = () => {
  const { data, isPending, error, isSuccess, mutate } = useMutation<
    PatchUserResponse,
    AxiosError<InvalidInputError | PlainError>,
    { id: string; data: PatchUserRequest }
  >({
    mutationKey: ['patchUser'],
    mutationFn: async ({ id, data }) => {
      const response = await usersApi.patchUser(id, data);
      return response.data;
    },
  });

  return { data, isPending, error, isSuccess, mutate };
};
