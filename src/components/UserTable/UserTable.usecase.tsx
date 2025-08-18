import * as Yup from 'yup';

export const UserValidationSchema = Yup.object().shape({
  fullname: Yup.string().required('Полное имя обязательно'),
  email: Yup.string().email('Некорректный email').required('Email обязателен'),
  password: Yup.string().min(6, 'Пароль должен содержать минимум 6 символов'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Пароли не совпадают'),
  role: Yup.string().oneOf(['user', 'admin'], 'Некорректная роль'),
});

export const UserTableValidationSchema = Yup.object().shape({
  users: Yup.array().of(UserValidationSchema),
});

export const UserInitialValues = {
  fullname: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'user',
};

export const UserTableInitialValues = {
  users: [],
};
