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
import { SectionLayout } from '@/layouts/SectionLayout';
import { ShieldIcon } from '@/components/icons/ShieldIcon';
import { Button } from '@/layouts/Button';
import { SaveIcon } from '@/components/icons/SaveIcon';
import { FastField, Form, Formik, type FastFieldProps } from 'formik';
import { useCustomToast } from '@/hooks/other/useCustomToast';
import { useRouter } from 'next/navigation';
import { useCreateUser } from '@/hooks/user/useCreateUser';
import { Role } from '@/shared/api/generated/data-contracts';
import { notifyMutationError } from '@/utils/notifyMutationError';
import { LinkDirection } from '@/shared/consts/links';

export default function TasksPage() {
  const notify = useCustomToast();
  const router = useRouter();
  const { mutate: createUser } = useCreateUser();
  return (
    <>
      <PageLayout
        title={createUserPageUsecase.title}
        subtitle={createUserPageUsecase.subtitle}
        className={style.container}>
        <Formik
          validationSchema={createUserValidationSchema}
          initialValues={createUserInitialValues}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            createUser(
              {
                name: values.fullName,
                email: values.email,
                password: values.password,
                role: values.isAdmin ? Role.Admin : Role.User,
              },
              {
                onSuccess: () => {
                  router.push(LinkDirection.HandleUsers);
                  notify('Аккаунт пользователя успешно создан', 'success');
                },
                onError: notifyMutationError(notify),
                onSettled: () => {
                  setSubmitting(false);
                },
              },
            );
          }}>
          {({ setFieldValue, handleChange, values, isSubmitting }) => (
            <Form>
              <SectionLayout
                title={createUserSectionUsecase.title}
                subtitle={createUserSectionUsecase.subtitle}>
                <div className={style.createUserInput}>
                  <p className={style.label}>Полное имя</p>

                  <FastField name='fullName'>
                    {({ field, meta }: FastFieldProps) => (
                      <InputLayout
                        type='text'
                        value={field.value}
                        name='fullName'
                        onChange={(value) => setFieldValue('fullName', value)}
                        onBlur={field.onBlur}
                        isRequired
                        placeholder={'Введите полное имя (ФИО)'}
                        errorText={meta.touched && meta.error ? meta.error : null}
                        autoComplete='off'
                      />
                    )}
                  </FastField>
                </div>
                <div className={style.createUserInput}>
                  <p className={style.label}>Email адрес</p>
                  <FastField name='email'>
                    {({ field, meta }: FastFieldProps) => (
                      <InputLayout
                        type='email'
                        name='email'
                        value={field.value}
                        onChange={(value) => setFieldValue('email', value)}
                        errorText={meta.touched && meta.error ? meta.error : null}
                        onBlur={field.onBlur}
                        isRequired
                        placeholder={'Введите email адрес'}
                        autoComplete='off'
                      />
                    )}
                  </FastField>
                </div>
                <div className={style.createUserInput}>
                  <p className={style.label}>Пароль</p>
                  <FastField name='password'>
                    {({ field, meta }: FastFieldProps) => (
                      <InputLayout
                        type='password'
                        name='password'
                        value={field.value}
                        onChange={(value) => setFieldValue('password', value)}
                        errorText={meta.touched && meta.error ? meta.error : null}
                        onBlur={field.onBlur}
                        isPassword
                        isRequired
                        placeholder={'Введите пароль'}
                        autoComplete='new-password'
                      />
                    )}
                  </FastField>
                </div>
                <div className={style.createUserInput}>
                  <p className={style.label}>Повторите пароль</p>
                  <FastField name='confirmPassword'>
                    {({ field, meta }: FastFieldProps) => (
                      <InputLayout
                        type='password'
                        name='confirmPassword'
                        value={field.value}
                        onChange={(value) => setFieldValue('confirmPassword', value)}
                        errorText={meta.touched && meta.error ? meta.error : null}
                        onBlur={field.onBlur}
                        isPassword
                        isRequired
                        placeholder={'Введите еще раз пароль'}
                        autoComplete='new-password'
                      />
                    )}
                  </FastField>
                </div>
                <div className={style.permissionCheckbox}>
                  <label className={style.checkboxContainer}>
                    <input
                      type='checkbox'
                      name='isAdmin'
                      className={style.checkboxInput}
                      checked={values.isAdmin}
                      onChange={handleChange}
                      aria-label='Права администратора'
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
