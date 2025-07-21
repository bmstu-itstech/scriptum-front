import {useQuery} from '@tanstack/react-query';
import {getUser} from '@/shared/api/user/getUserById';

export const useGetUserById = (id: number) => {
  const {
    data: accessData,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ['users', id.toString()],
    queryFn: () => getUser(id),
  });

  return {accessData, isLoading, refetch, error};
};
