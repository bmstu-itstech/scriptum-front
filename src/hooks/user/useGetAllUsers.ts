import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { usersApi } from '@/shared/api/UsersClient';
import type { User } from '@/shared/api/generated/data-contracts';

export const useGetAllUsers = (options?: Partial<UseQueryOptions<User[]>>) => {
  const { data, isLoading, refetch, error } = useQuery({
    ...options,
    queryKey: ['users'],
    queryFn: async () => {
      const response = await usersApi.getUsers();
      return response.data;
    },
  });

  return { data, isLoading, refetch, error };
};
