import type { AxiosError } from 'axios';
import type { TypeOptions } from 'react-toastify';
import { getErrorMessage } from '@/utils/getErrorText';

type ApiErrorBody = { message?: string };
type NotifyFn = (content: string, type: TypeOptions) => void;

export function notifyMutationError(notify: NotifyFn) {
  return (error: AxiosError<ApiErrorBody>) => {
    notify(getErrorMessage(error), 'error');
  };
}
