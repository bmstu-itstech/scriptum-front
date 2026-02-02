import * as Yup from 'yup';

export const authValidationSchema = Yup.object({
  email: Yup.string().email('Некорректный email адрес').required('Email обязателен для заполнения'),
  password: Yup.string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .required('Пароль обязателен для заполнения'),
});
