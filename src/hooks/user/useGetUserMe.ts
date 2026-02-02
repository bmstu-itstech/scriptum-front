import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { usersApi } from '@/shared/api/UsersClient';
import type { User, PlainError } from '@/shared/api/generated/data-contracts';
import type { AxiosError } from 'axios';

export const useGetUserMe = (options?: Partial<UseQueryOptions<User, AxiosError<PlainError>>>) => {
  const { data, isLoading, refetch, error } = useQuery({
    ...options,
    queryKey: ['user', 'me'],
    queryFn: async () => {
      const response = await usersApi.getUserMe();
      return response.data;
    },
  });

  return { data, isLoading, refetch, error };
};
