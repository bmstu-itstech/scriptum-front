import { useMutation } from '@tanstack/react-query';
import { createScript } from '@/shared/api/script/createScript';
import type { IScriptError, IScriptSend } from '@/domain/entities/script';
import type { AxiosError } from 'axios';

export const useCreateScript = () => {
  const { data, isPending, error, isSuccess, mutate } = useMutation<
    IScriptSend,
    AxiosError<IScriptError>,
    IScriptSend
  >({
    mutationKey: ['createScript'],
    mutationFn: (values: IScriptSend) => createScript(values),
  });

  return { data, isPending, error, isSuccess, mutate };
};
