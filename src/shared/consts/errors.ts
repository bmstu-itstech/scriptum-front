export interface IErrorToText{
    400: string;
    401: string;
    404: string;
    500: string;
}

export const errorsToText: IErrorToText = {
  400: 'Некорректный запрос',
  401: 'Для доступа необходима авторизация',
  404: 'Не найдено',
  500: 'Ошибка сервера, попробуйте позже',
};