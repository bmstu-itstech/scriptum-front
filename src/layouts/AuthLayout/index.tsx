'use client';
import { FC } from 'react';
import { Props } from './AuthLayout.props';
import styles from './AuthLayout.module.css';
import cn from 'classnames';
import { LoginLogoIcon } from '@/components/icons/LoginLogoIcon';
import InputLayout from '@/layouts/InputLayout';
import { OpenEyeIcon } from '@/components/icons/OpenEyeIcon';
import { CloseEyeIcon } from '@/components/icons/CloseEyeIcon';
import { LoginIcon } from '@/components/icons/LoginIcon';
import { Button } from '@/shared/Button';
import { FastField, Form, Formik, type FastFieldProps } from 'formik';
import { authValidationSchema } from '@/app/(withoutHeader)/login/page.usecase';
import { useLogin } from '@/hooks/auth/useLogin';
import { useRouter } from 'next/navigation';
import { useCustomToast } from '@/hooks/other/useCustomToast';
import { useGetUserMe } from '@/hooks/user/useGetUserMe';

export const AuthLayout: FC<Props> = ({ className, ...props }) => {
  const { mutate: login } = useLogin();
  const router = useRouter();
  const notify = useCustomToast();
  const { refetch } = useGetUserMe({ enabled: false });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={authValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        login(
          {
            email: values.email,
            password: values.password,
          },
          {
            onSuccess: async (data) => {
              document.cookie = `access_token=${data.accessToken}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
              try {
                await refetch();
              } catch (error) {
                notify('Ошибка при получении данных пользователя', 'error');
              }
              notify('Успешный вход в систему', 'success');
              router.push('/');
            },
            onError: () => {
              notify('Неверный email или пароль', 'error');
            },
            onSettled: () => {
              setSubmitting(false);
            },
          },
        );
      }}>
      {({ isSubmitting }) => (
        <Form className={cn(styles.authForm, className)}>
          <div className={cn(styles.authContainer)} {...props}>
            <div className={cn(styles.header)}>
              <div className={styles.icon}>{<LoginLogoIcon />}</div>
              <div className={styles.content}>
                <h1 className={styles.title}>Вход</h1>
                <p className={styles.subtitle}>Войдите в систему управления скриптами</p>
              </div>
            </div>

            <div className={styles.center}>
              <FastField name={'email'}>
                {({ form, field, meta }: FastFieldProps) => (
                  <InputLayout
                    type='email'
                    inputTitle='Email'
                    name={field.name}
                    inputLabelClassName={styles.inputLabel}
                    placeholder={'Введите ваш email'}
                    value={field.value}
                    onChange={(value) => form.setFieldValue(field.name, value)}
                    className={styles.input}
                    onBlur={field.onBlur}
                    errorText={meta.touched && meta.error ? meta.error : null}
                    autoComplete='email'
                  />
                )}
              </FastField>

              <FastField name={'password'}>
                {({ form, field, meta }: FastFieldProps) => (
                  <InputLayout
                    type='password'
                    isPassword
                    inputTitle='Пароль'
                    name={field.name}
                    inputLabelClassName={styles.inputLabel}
                    placeholder={'Введите ваш пароль'}
                    value={field.value}
                    onChange={(value) => form.setFieldValue(field.name, value)}
                    className={styles.input}
                    onBlur={field.onBlur}
                    errorText={meta.touched && meta.error ? meta.error : null}
                    autoComplete='current-password'
                    toggleIcons={{
                      show: <OpenEyeIcon />,
                      hide: <CloseEyeIcon />,
                    }}
                  />
                )}
              </FastField>
            </div>
            <div className={cn(styles.tail, className)}>
              <Button
                isLoading={isSubmitting}
                icon={<LoginIcon />}
                className={styles.loginBtn}
                type='submit'>
                Войти
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
