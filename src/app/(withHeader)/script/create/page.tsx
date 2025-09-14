'use client';
import { PageLayout } from '@/layouts/PageLayout';
import {
  pageCreateUsecase,
  ScriptInitialValues,
  ScriptSchema,
} from '@/app/(withHeader)/script/create/page.usecase';
import InputLayout from '@/layouts/InputLayout';
import { InfoBlockLayout } from '@/layouts/InfoBlockLayout';
import styles from '@/app/(withHeader)/script/create/page.module.css';
import { ScriptParametrsLoader } from '@/components/ScriptParametrsLoader';
import { Formik, Form, FastField, type FastFieldProps } from 'formik';
import { Button } from '@/shared/Button';
import { SaveScriptIcon } from '@/components/icons/SaveScriptIcon';
import { useCreateScript } from '@/hooks/script/useCreateScript';
import { useUploadFile } from '@/hooks/script/useUploadFile';
import { useRouter } from 'next/navigation';
import { getSendValues } from '@/utils/send';
import { useCustomToast } from '@/hooks/other/useCustomToast';
import { getErrorText } from '@/utils/getErrorText';

export default function CreatePage() {
  const router = useRouter();
  const { mutate: createScript } = useCreateScript();
  const { mutateAsync: uploadFile } = useUploadFile();
  const notify = useCustomToast();

  return (
    <PageLayout>
      <Formik
        initialValues={ScriptInitialValues}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            const uploadedFiles = await Promise.all(
              values.file!.map(async (file) => {
                // Дополнительные проверки (например, по размеру)
                if (file.size > 5 * 1024 * 1024) {
                  notify('Размер файла не должен превышать 5 МБ', 'error');
                }

                // Загрузка файла
                const { file_id } = await uploadFile(file);

                return {
                  name: file.name,
                  id: file_id,
                };
              }),
            );

            // Найдём ID основного файла (проверенного)
            const mainFile = uploadedFiles.find(
              (uploaded) => uploaded.name === values.file_checked?.name,
            );
            const main_file_id = mainFile?.id;

            if (!main_file_id) {
              notify('Основной файл не выбран или не загружен', 'error');
              setSubmitting(false);
              return;
            }

            // Соберём остальные файлы (если нужно)
            const extra_file_ids = uploadedFiles
              .filter((f) => f.id !== main_file_id)
              .map((f) => f.id);

            // Отправим createScript
            createScript(
              {
                script_name: values.name,
                script_description: values.desc,
                main_file_id: main_file_id,
                extra_file_ids: extra_file_ids,
                in_fields: values.inputParams.map((param) => ({
                  name: param.name,
                  description: param.desc,
                  unit: param.measure,
                  type: getSendValues(param.type),
                })),
                out_fields: values.outputParams.map((param) => ({
                  name: param.name,
                  description: param.desc,
                  unit: param.measure,
                  type: getSendValues(param.type),
                })),
              },
              {
                onSuccess: () => {
                  router.push('/');
                  notify('Скрипт успешно создан', 'success');
                },
                onError: (error) => {
                  notify(getErrorText(error.response?.status ?? 7777), 'error');
                },
              },
            );
          } catch (err) {
            notify('Произошла ошибка при загрузке файла, попробуйте ещё раз', 'error');
          }

          setSubmitting(false);
        }}
        validationSchema={ScriptSchema}>
        {({ handleSubmit, handleBlur, errors, touched, isSubmitting, values }) => (
          <Form onSubmit={handleSubmit} className={styles.form}>
            <InfoBlockLayout
              headerClassname={styles.infoblock__header}
              contentClassname={styles.infoblock__content}
              className={styles.infoblock}
              header={pageCreateUsecase.main.header}>
              <div className={styles.flex}>
                <FastField name={`name`}>
                  {({ field }: FastFieldProps) => (
                    <InputLayout
                      type='text'
                      // value={field.value ?? ''}
                      inputTitle={pageCreateUsecase.main.blocks.scriptTitle.title}
                      className={styles.input}
                      placeholder={pageCreateUsecase.main.blocks.scriptTitle.placeholder}
                      errorText={errors.name && touched.name ? errors.name : null}
                      {...field}
                    />
                  )}
                </FastField>
                <FastField name={`file`}>
                  {({ field }: FastFieldProps) => (
                    <InputLayout
                      type='file'
                      name={field.name}
                      value={field.value ?? ''}
                      inputTitle={pageCreateUsecase.main.blocks.scriptCode.title}
                      placeholder={pageCreateUsecase.main.blocks.scriptCode.placeholder}
                      errorText={errors.file && touched.file ? errors.file : null}
                      onBlur={handleBlur}
                    />
                  )}
                </FastField>
              </div>
              <FastField name={`desc`}>
                {({ field }: FastFieldProps) => (
                  <InputLayout
                    type='text'
                    inputTitle={pageCreateUsecase.main.blocks.scriptDesc.title}
                    className={styles.input}
                    isTextArea
                    inputClassName={styles.desc}
                    // value={field.value ?? ''}
                    placeholder={pageCreateUsecase.main.blocks.scriptDesc.placeholder}
                    errorText={errors.desc && touched.desc ? errors.desc : null}
                    {...field}
                  />
                )}
              </FastField>
            </InfoBlockLayout>
            <ScriptParametrsLoader params={values.inputParams} type='input' />
            <ScriptParametrsLoader params={values.outputParams} type='output' />
            <Button
              isLoading={isSubmitting}
              className={styles.saveBtn}
              icon={<SaveScriptIcon />}
              type='submit'>
              Сохранить скрипт
            </Button>
          </Form>
        )}
      </Formik>
    </PageLayout>
  );
}
