import { useQuery } from '@tanstack/react-query';
import { jobsApi } from '@/shared/api/JobsClient';
import type { Job } from '@/shared/api/generated/data-contracts';

export const useGetJobs = () => {
  const { data, isLoading } = useQuery<Job[]>({
    queryKey: ['jobs'],
    queryFn: async (): Promise<Job[]> => {
      const response = await jobsApi.getJobs();
      return response.data;
    },
    refetchInterval: 5000,
  });
  return { data, isLoading };
};
