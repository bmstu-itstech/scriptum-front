import { useQuery } from '@tanstack/react-query';
import { jobsList } from '@/shared/api/job/getAllJobs';

export const useGetJobs = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: jobsList,
  });
  return { data, isLoading };
};
