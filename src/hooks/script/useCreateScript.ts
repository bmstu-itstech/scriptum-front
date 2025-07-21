import {useMutation} from '@tanstack/react-query';
import {createScript} from '@/shared/api/script/createScript';

export const useCreateScript = () => {
  const {
    data: accessData,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['createScript'],
    mutationFn: createScript,
  });

  return {accessData, isPending, error};
};
