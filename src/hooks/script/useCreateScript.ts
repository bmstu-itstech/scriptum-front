import { useMutation } from '@tanstack/react-query';
import { createScript } from '@/shared/api/script/createScript';
import type { IScriptSend } from '@/domain/entities/script';

export const useCreateScript = () => {
  const { data, isPending, error, mutate } = useMutation({
    mutationKey: ['createScript'],
    mutationFn: (values: IScriptSend) => createScript(values),
  });

  return { data, isPending, error, mutate };
};
