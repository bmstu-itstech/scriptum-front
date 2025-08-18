import * as Yup from 'yup';

export const authValidationSchema = Yup.object({
  username: Yup.string()
    .min(6, 'Логин должен содержать минимум 6 символов')
    .required('Логин обязателен для заполнения'),
  password: Yup.string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .required('Пароль обязателен для заполнения'),
});
