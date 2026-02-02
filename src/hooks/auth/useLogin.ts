import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/shared/api/AuthClient';
import type {
  LoginRequest,
  LoginResponse,
  PlainError,
} from '@/shared/api/generated/data-contracts';
import type { AxiosError } from 'axios';

export const useLogin = () => {
  const { data, isPending, error, isSuccess, mutate } = useMutation<
    LoginResponse,
    AxiosError<PlainError>,
    LoginRequest
  >({
    mutationKey: ['login'],
    mutationFn: async (values: LoginRequest) => {
      const response = await authApi.login(values);
      return response.data;
    },
  });

  return { data, isPending, error, isSuccess, mutate };
};
