import { useMutation } from '@tanstack/react-query';
import { startScript } from '@/shared/api/script/startScript';
import type { IScriptError, IScriptStart } from '@/domain/entities/script';
import type { AxiosError } from 'axios';

export const useStartScript = ({ id }: { id: number }) => {
  const { isPending, error, mutate } = useMutation<
    IScriptStart,
    AxiosError<IScriptError>,
    IScriptStart
  >({
    mutationKey: ['startScript', id.toString()],
    mutationFn: (value: IScriptStart) => startScript(value, id),
  });

  return { isPending, error, mutate };
};
