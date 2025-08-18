'use client';
import style from './page.module.css';
import { PageLayout } from '@/layouts/PageLayout';
import {
  createUserInitialValues,
  createUserPageUsecase,
  createUserSectionUsecase,
  createUserValidationSchema,
} from './page.usecase';
import InputLayout from '@/layouts/InputLayout';
import InputLayoutStyle from '@/layouts/InputLayout/InputLayout.module.css';
import { SectionLayout } from '@/layouts/SectionLayout';
import { ShieldIcon } from '@/components/icons/ShieldIcon';
import { Button } from '@/layouts/Button';
import { SaveIcon } from '@/components/icons/SaveIcon';
import { useState } from 'react';
import { PopupLayout } from '@/layouts/PopupLayout';
import { Form, Formik } from 'formik';

export default function TasksPage() {
  const [popup, setPopup] = useState<{
    visible: boolean;
    variant: 'success' | 'error' | 'warning';
    title: string;
    description?: string;
  } | null>(null);

  const showPopup = (
    variant: 'success' | 'error' | 'warning',
    title: string,
    description?: string,
  ) => {
    setPopup({ visible: true, variant, title, description });
    setTimeout(() => setPopup(null), 5000);
  };

  return (
    <>
      {popup && (
        <PopupLayout
          variant={popup.variant}
          title={popup.title}
          description={popup.description || ''}
          onClose={() => setPopup(null)}
        />
      )}

      <PageLayout
        title={createUserPageUsecase.title}
        subtitle={createUserPageUsecase.subtitle}
        className={style.container}>
        <Formik
          validationSchema={createUserValidationSchema}
          initialValues={createUserInitialValues}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            // Simulate API call
            setTimeout(() => {
              console.log('User created:', values);
              showPopup('success', 'Готово!', 'Аккаунт пользователя успешно создан');
              setSubmitting(false);
            }, 1000);
            setSubmitting(false);
          }}>
          {({ errors, touched, handleBlur, handleChange, values, isSubmitting }) => (
            <Form>
              <SectionLayout
                title={createUserSectionUsecase.title}
                subtitle={createUserSectionUsecase.subtitle}>
                <div className={style.createUserInput}>
                  <p className={style.label}>Полное имя</p>
                  <InputLayout
                    type='text'
                    value={values.fullName}
                    name='fullName'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    placeholder={'Введите полное имя (ФИО)'}
                    errorText={errors.fullName && touched.fullName ? errors.fullName : null}
                    // className={errors.fullName && InputLayoutStyle.error}
                  />
                </div>
                <div className={style.createUserInput}>
                  <p className={style.label}>Email адрес</p>
                  <InputLayout
                    type='email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    placeholder={'Введите email адрес'}
                    errorText={errors.email && touched.email ? errors.email : null}
                  />
                </div>
                <div className={style.createUserInput}>
                  <p className={style.label}>Пароль</p>
                  <InputLayout
                    type='password'
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isPassword
                    isRequired
                    placeholder={'Введите пароль'}
                    errorText={errors.password && touched.password ? errors.password : null}
                  />
                </div>
                <div className={style.createUserInput}>
                  <p className={style.label}>Повторите пароль</p>
                  <InputLayout
                    type='password'
                    name='confirmPassword'
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isPassword
                    isRequired
                    placeholder={'Введите еще раз пароль'}
                    errorText={
                      errors.confirmPassword && touched.confirmPassword
                        ? errors.confirmPassword
                        : null
                    }
                  />
                </div>
                <div className={style.permissionCheckbox}>
                  <label className={style.checkboxContainer}>
                    <input
                      type='checkbox'
                      name='isAdmin'
                      className={style.checkboxInput}
                      checked={values.isAdmin}
                      onChange={handleChange}
                    />
                    <span className={style.checkmark}></span>
                    <div className={style.checkboxContent}>
                      <div className={style.checkboxTitle}>
                        <ShieldIcon className={style.checkboxIcon} />
                        Права администратора
                      </div>
                      <p className={style.checkboxDescription}>
                        Пользователь с правами администратора сможет создавать других пользователей,
                        управлять скриптами всех пользователей и просматривать все задачи в системе.
                      </p>
                    </div>
                  </label>
                </div>
                <Button
                  className={style.saveBtn}
                  icon={<SaveIcon />}
                  type='submit'
                  isLoading={isSubmitting}>
                  Создать пользователя
                </Button>
              </SectionLayout>
            </Form>
          )}
        </Formik>
        <div className={style.infoSection}>
          <div>
            <div className={style.infoIcon}>
              <ShieldIcon width={16} height={16} />
            </div>
          </div>
          <div className={style.infoMain}>
            <p className={style.infoTitle}>Информация о правах доступа</p>
            <p className={style.infoAdmin}>
              <span className={style.infoStrong}>Обычный пользователь:</span> может создавать и
              запускать свои скрипты, просматривать свои задачи
            </p>
            <p className={style.infoUser}>
              <span className={style.infoStrong}>Администратор:</span> полный доступ ко всем
              функциям системы, включая управление пользователями
            </p>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
