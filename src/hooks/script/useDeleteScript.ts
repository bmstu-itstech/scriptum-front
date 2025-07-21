import {useMutation} from '@tanstack/react-query';
import {deleteScript} from '@/shared/api/script/deleteScript';

export const useDeleteScript = (id: number) => {
  const {data, isPending, error, mutate} = useMutation({
    mutationKey: ['deleteScript', id.toString()],
    mutationFn: () => deleteScript(id),
  });

  return {data, isPending, error, mutate};
};
