import {useMutation} from '@tanstack/react-query';
import {startScript} from '@/shared/api/script/startScript';

export const useStartScript = (id: number) => {
  const {
    data,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['startScript', id.toString()],
    mutationFn: () => startScript(id),
  });

  return {data, isPending, error};
};
