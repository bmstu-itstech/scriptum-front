import { useQuery } from '@tanstack/react-query';
import { usersList } from '@/shared/api/user/getAllUsers';

export const useGetAllUsers = () => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['users'],
    queryFn: usersList,
  });

  return { data, isLoading, refetch, error };
};
