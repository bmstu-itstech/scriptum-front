import { useMutation } from '@tanstack/react-query';
import { startScript } from '@/shared/api/script/startScript';
import type { IScriptStart } from '@/domain/entities/script';

export const useStartScript = (id: number) => {
  const { isPending, error, mutate } = useMutation({
    mutationKey: ['startScript'],
    mutationFn: (value: IScriptStart) => startScript(value, id),
  });

  return { isPending, error, mutate };
};
