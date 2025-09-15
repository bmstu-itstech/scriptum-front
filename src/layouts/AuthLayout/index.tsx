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

export const AuthLayout: FC<Props> = ({ className, ...props }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={authValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });

          if (!res.ok) {
            alert('Неверный логин или пароль');
            return;
          }

          // редирект после успешного логина
          window.location.href = '/';
        } catch (err) {
          console.error('Ошибка логина', err);
        } finally {
          setSubmitting(false);
        }
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

              <FastField name={'username'}>
                {({ form, field, meta }: FastFieldProps) => (
                  <InputLayout
                    type='text'
                    name={field.name}
                    inputLabelClassName={styles.inputLabel}
                    placeholder={'Введите ваш логин'}
                    value={field.value}
                    onChange={(value) => form.setFieldValue(field.name, value)}
                    className={styles.input}
                    onBlur={field.onBlur}
                    errorText={meta.touched && meta.error ? meta.error : null}
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
          )
        </Form>
      )}
    </Formik>
  );
};
