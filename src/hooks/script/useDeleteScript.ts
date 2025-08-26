import { useMutation } from '@tanstack/react-query';
import { deleteScript } from '@/shared/api/script/deleteScript';
import type { AxiosError } from 'axios';
import type { IScript, IScriptError } from '@/domain/entities/script';

export const useDeleteScript = () => {
  const { data, isPending, error, mutate } = useMutation<IScript, AxiosError<IScriptError>, number>(
    {
      mutationKey: ['deleteScript'],
      mutationFn: (id: number) => deleteScript(id),
    },
  );

  return { data, isPending, error, mutate };
};
