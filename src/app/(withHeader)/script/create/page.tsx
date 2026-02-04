'use client';
import { PageLayout } from '@/layouts/PageLayout';
import { ScriptInitialValues, ScriptSchema } from '@/app/(withHeader)/script/create/page.usecase';
import styles from '@/app/(withHeader)/script/create/page.module.css';
import { ScriptParametrsLoader } from '@/components/ScriptParametrsLoader';
import { Formik, Form } from 'formik';
import { Button } from '@/shared/Button';
import { SaveScriptIcon } from '@/components/icons/SaveScriptIcon';
import { useCreateScript } from '@/hooks/script/useCreateScript';
import { useUploadFile } from '@/hooks/script/useUploadFile';
import { useRouter } from 'next/navigation';
import { getSendValues } from '@/utils/send';
import { useCustomToast } from '@/hooks/other/useCustomToast';
import { notifyMutationError } from '@/utils/notifyMutationError';
import { ScriptFormInfoBlock } from '@/components/ScriptFormInfoBlock';
import { ValueType } from '@/shared/api/generated/data-contracts';

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
            if (!values.file) {
              notify('Файл не выбран', 'error');
              setSubmitting(false);
              return;
            }

            if (values.file.size > 50 * 1024 * 1024) {
              notify('Размер файла не должен превышать 50 МБ', 'error');
              setSubmitting(false);
              return;
            }

            const response = await uploadFile(values.file);
            const file_id = response.data.fileID;

            createScript(
              {
                name: values.name.trim(),
                desc: values.desc?.trim() ?? '',
                archiveID: String(file_id),
                in: values.inputParams.map((param) => ({
                  name: param.name.trim(),
                  desc: param.desc?.trim() ?? '',
                  unit: param.measure?.trim() ?? '',
                  type: getSendValues(param.type) as ValueType,
                })),
                out: values.outputParams.map((param) => ({
                  name: param.name.trim(),
                  desc: param.desc?.trim() ?? '',
                  unit: param.measure?.trim() ?? '',
                  type: getSendValues(param.type) as ValueType,
                })),
              },
              {
                onSuccess: () => {
                  router.push('/');
                  notify('Скрипт успешно создан', 'success');
                },
                onError: notifyMutationError(notify),
              },
            );
          } catch (err) {
            notify('Произошла ошибка при загрузке файла, попробуйте ещё раз', 'error');
          }

          setSubmitting(false);
        }}
        validationSchema={ScriptSchema}>
        {({ handleSubmit, isSubmitting, values }) => (
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
