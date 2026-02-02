import {
  errorsToText,
  SERVER_MESSAGE_TEMPLATE,
  UNKNOWN_STATUS,
  type IErrorToText,
} from '@/shared/consts/errors';
import type { AxiosError } from 'axios';

/** Ошибка API с опциональным полем message (PlainError, InvalidInputError и т.д.) */
type ApiErrorBody = { message?: string };

export const getErrorText = (status: number): string => {
  if (!status || status === UNKNOWN_STATUS) {
    return 'Неизвестная ошибка';
  }

  if (status >= 500 && status < 600) {
    return errorsToText[500];
  }

  if (status >= 400 && status < 500) {
    return errorsToText[status as keyof IErrorToText] ?? 'Неизвестная ошибка';
  }

  return 'Неизвестная ошибка';
};

export function getErrorMessage(error: AxiosError<ApiErrorBody>): string {
  const message = error.response?.data?.message;

  if (message && typeof message === 'string' && message.trim() !== '') {
    return SERVER_MESSAGE_TEMPLATE.replace('{message}', message);
  }

  return getErrorText(error.response?.status ?? UNKNOWN_STATUS);
}
