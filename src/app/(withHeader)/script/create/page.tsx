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
import { ScriptFormInfoBlock } from '@/components/ScriptFormInfoBlock';

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
            <ScriptFormInfoBlock />
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
