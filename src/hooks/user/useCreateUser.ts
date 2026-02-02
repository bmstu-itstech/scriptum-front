import { useMutation } from '@tanstack/react-query';
import { usersApi } from '@/shared/api/UsersClient';
import type {
  CreateUserRequest,
  CreateUserResponse,
  InvalidInputError,
  PlainError,
} from '@/shared/api/generated/data-contracts';
import type { AxiosError } from 'axios';

export const useCreateUser = () => {
  const { data, isPending, error, isSuccess, mutate } = useMutation<
    CreateUserResponse,
    AxiosError<InvalidInputError | PlainError>,
    CreateUserRequest
  >({
    mutationKey: ['createUser'],
    mutationFn: async (values: CreateUserRequest) => {
      const response = await usersApi.createUser(values);
      return response.data;
    },
  });

  return { data, isPending, error, isSuccess, mutate };
};
