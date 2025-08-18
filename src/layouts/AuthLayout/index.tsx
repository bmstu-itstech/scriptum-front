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
import { Form, Formik } from 'formik';
import { authValidationSchema } from '@/app/(withoutHeader)/login/page.usecase';

export const AuthLayout: FC<Props> = ({ className, ...props }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={authValidationSchema}
      onSubmit={(values) => {
        console.log('Form submitted:', values);
        alert('Гойда');
      }}>
      {({ values, handleBlur, handleChange, errors, touched, isSubmitting }) => (
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
              <InputLayout
                type='text'
                name='username'
                isRequired={true}
                inputTitle='Логин'
                inputLabelClassName={styles.inputLabel}
                className={styles.input}
                value={values.username}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder={'Введите ваш логин'}
                errorText={touched.username && errors.username ? errors.username : null}
              />
              <InputLayout
                type='password'
                isPassword
                isRequired
                inputTitle='Пароль'
                name='password'
                value={values.password}
                inputLabelClassName={styles.inputLabel}
                className={styles.input}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder={'Введите ваш пароль'}
                errorText={touched.password && errors.password ? errors.password : null}
                toggleIcons={{
                  show: <OpenEyeIcon />,
                  hide: <CloseEyeIcon />,
                }}
              />
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
