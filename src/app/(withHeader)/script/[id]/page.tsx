'use client';
import { ScriptInfo } from '@/components/ScriptInfo';
import { ScriptParametrs } from '@/components/ScriptParametrs';
import { PageLayout } from '@/layouts/PageLayout';
import {
  ScriptParametersInputUsecase,
  ScriptParametersOutputUsecase,
} from '@/components/ScriptParametrs/ScriptParametrs.usecase';
import { ScriptParametrLayout } from '@/layouts/ScriptParametrsLayout/components/ScriptParametrLayout';
import { LinkBack } from '@/components/LinkBack';
import { BackArrowIcon } from '@/components/icons/BackArrowIcon';
import LinkBtnStyles from '@/components/LinkBack/LinkBack.module.css';
import styles from '@/app/(withHeader)/script/[id]/page.module.css';
import { ScriptSettings } from '@/components/ScriptSettings';
import { RunCodeButton } from '@/shared/RunCodeButton';
import { useGetScriptById } from '@/hooks/script/useGetScriptById';
import cn from 'classnames';
import { useParams, useRouter } from 'next/navigation';
import { Formik } from 'formik';
import { runScriptValidationSchema } from '@/app/(withHeader)/script/[id]/page.usecase';
import { useStartScript } from '@/hooks/script/useStartScript';
import { useCustomToast } from '@/hooks/other/useCustomToast';
import { getErrorText } from '@/utils/getErrorText';
import { Loading } from '@/shared/Loading';
import { CsvUploader } from '@/components/CsvUploader';


export default function Page() {
  const params = useParams();
  const script_id = Number(params.id);
  const shouldLoad = !isNaN(script_id);
  const router = useRouter();
  const notify = useCustomToast();

  const { data, isLoading } = useGetScriptById(shouldLoad ? script_id : 0);
  const { mutate, isPending } = useStartScript({ id: shouldLoad ? script_id : 0 });

  if (!shouldLoad || isLoading || !data) {
    return <Loading />;
  }


  const initialValues = {
    in_params: data.in_fields.map((item) => ({
      type: item.type,
      data: '',
    })),
    notify_by_email: false,
  };

  return (
    <PageLayout className={styles.page__container}>
      <LinkBack
        className={LinkBtnStyles.LinkBack__title}
        title='Вернуться к списку скриптов'
        icon={<BackArrowIcon />}
      />
      <ScriptInfo {...data} />

      <Formik
        initialValues={initialValues}
        validationSchema={runScriptValidationSchema}
        onSubmit={(values) => {
          mutate(
            {
              in_params: values.in_params.map((param) => ({
                type: param.type,
                data: param.data,
              })),
              notify_by_email: values.notify_by_email,
            },
            {
              onSuccess: () => {
                router.push('/tasks');
                notify('Задача успешно запущена', 'success');
              },
              onError: (error) => {
                notify(
                  getErrorText(error.response?.status ? error.response.status : 7777),
                  'error',
                );
              },
            },
          );
        }}>
        {({ handleSubmit, setFieldValue }) => (
          <>
            <CsvUploader
              onParsed={(csvValues) => {
                if (csvValues.length !== data.in_fields.length) {
                  notify(
                    `Ожидалось ${data.in_fields.length} значений, а получено ${csvValues.length}.`,
                    'error'
                  );
                  return;
                }
                csvValues.forEach((val, idx) => {
                  setFieldValue(`in_params[${idx}].data`, val);
                });

                notify('Данные из CSV успешно подставлены.', 'success');
              }}
            />
            <form onSubmit={handleSubmit} className={styles.form}>
              <ScriptParametrs
                contentClassname={cn(styles.col2)}
                innerContentClassname={cn(styles.col2)}
                header={ScriptParametersInputUsecase.header}>
                {data.in_fields.map((item, id) => {
                  return (
                    <ScriptParametrLayout
                      formikName={`in_params[${id}].data`}
                      key={id}
                      typeOfCard='input'
                      {...item}
                    />
                  );
                })}
              </ScriptParametrs>
              <ScriptParametrs
                contentClassname={cn(styles.col2)}
                innerContentClassname={cn(styles.col2)}
                header={ScriptParametersOutputUsecase.header}>
                {data.out_fields.map((item, id) => {
                  return <ScriptParametrLayout key={id} typeOfCard='output' {...item} />;
                })}
              </ScriptParametrs>
              <ScriptSettings />
              <RunCodeButton isLoading={isPending} className={styles.page_runScriptBtn} />
            </form>
          </>

        )}
      </Formik>
    </PageLayout>
  );
}
