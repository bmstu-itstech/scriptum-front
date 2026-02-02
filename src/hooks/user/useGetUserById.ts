import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { usersApi } from '@/shared/api/UsersClient';
import type { User, PlainError } from '@/shared/api/generated/data-contracts';
import type { AxiosError } from 'axios';

export const useGetUserById = (
  id: number,
  options?: Partial<UseQueryOptions<User, AxiosError<PlainError>>>,
) => {
  const { data, isLoading, refetch, error } = useQuery({
    ...options,
    queryKey: ['users', id.toString()],
    queryFn: async () => {
      const response = await usersApi.getUser(id.toString());
      return response.data;
    },
  });

  return { data, isLoading, refetch, error };
};
