import { useMutation } from '@tanstack/react-query';
import { deleteScript } from '@/shared/api/script/deleteScript';

export const useDeleteScript = () => {
  const { data, isPending, error, mutate } = useMutation({
    mutationKey: ['deleteScript'],
    mutationFn: (id: number) => deleteScript(id),
  });

  return { data, isPending, error, mutate };
};
