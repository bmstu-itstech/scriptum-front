import { errorsToText, type IErrorToText } from '@/shared/consts/errors';
export const getErrorText = (status: number): string => {
  if (status >= 500 && status < 600) {
    return errorsToText[500];
  } else if (status >= 400 && status < 500) {
    return errorsToText[status as keyof IErrorToText];
  }
  return 'Неизвестная ошибка';
};
