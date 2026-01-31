import { useMutation } from '@tanstack/react-query';
import { updateScript } from '@/shared/api/script/updateScript';
import type { AxiosError } from 'axios';
import type { IScript, IScriptError } from '@/domain/entities/script';

export const useUpdateScript = (id: number) => {
  const { data, isPending, error } = useMutation<IScript, AxiosError<IScriptError>>({
    mutationKey: ['updateScript', id.toString()],
    mutationFn: async () => await updateScript(id),
  });

  return { data, isPending, error };
};
