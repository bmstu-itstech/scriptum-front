import { useMutation } from '@tanstack/react-query';
import { updateScript } from '@/shared/api/script/updateScript';

export const useUpdateScript = (id: number) => {
  const { data, isPending, error } = useMutation({
    mutationKey: ['updateScript', id.toString()],
    mutationFn: () => updateScript(id),
  });

  return { data, isPending, error };
};
