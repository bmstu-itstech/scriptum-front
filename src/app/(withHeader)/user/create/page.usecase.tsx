import * as Yup from 'yup';
export const createUserPageUsecase = {
  title: 'Создание пользователя',
  subtitle: 'Добавьте нового пользователя в систему управления скриптами',
};

export const createUserSectionUsecase = {
  title: 'Данные пользователя',
  subtitle: 'Заполните информацию о новом пользователе',
};

export const createUserValidationSchema = Yup.object({
  fullName: Yup.string()
    .required('Полное имя обязательно')
    .min(2, 'Слишком короткое имя')
    .max(100, 'Слишком длинное имя'),
  email: Yup.string().required('Email обязателен').email('Некорректный email'),
  password: Yup.string()
    .required('Пароль обязателен')
    .min(6, 'Пароль должен содержать минимум 6 символов'),
  confirmPassword: Yup.string()
    .required('Подтверждение пароля обязательно')
    .oneOf([Yup.ref('password')], 'Пароли не совпадают'),
  isAdmin: Yup.boolean(),
});

export const createUserInitialValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  isAdmin: false,
};
