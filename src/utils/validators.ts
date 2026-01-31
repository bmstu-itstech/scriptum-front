export const validateEmail = (email: string): string | null => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !email.trim()) {
    return 'Email обязателен для заполнения';
  }

  if (!re.test(email)) {
    return 'Введите корректный email адрес';
  }

  return null;
};

export const validatePassword = (password: string, confirmPassword?: string): string | null => {
  if (!password && (!confirmPassword || confirmPassword === '')) {
    return null;
  }

  if (password && (!confirmPassword || confirmPassword === '')) {
    return 'Подтвердите пароль';
  }

  if ((!password || password === '') && confirmPassword) {
    return 'Введите пароль';
  }

  if (password && password.length < 6) {
    return 'Пароль должен содержать минимум 6 символов';
  }

  if (password && confirmPassword && password !== confirmPassword) {
    return 'Пароли не совпадают';
  }

  return null;
};

export const validateFullname = (fullname: string): string | null => {
  if (!fullname || !fullname.trim()) {
    return 'ФИО обязательно для заполнения';
  }

  if (fullname.length < 2) {
    return 'ФИО слишком короткое';
  }

  if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(fullname)) {
    return 'ФИО содержит недопустимые символы';
  }

  return null;
};
