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
  const scriptId = String(params.id);
  const router = useRouter();
  const notify = useCustomToast();

  const { data, isLoading } = useGetScriptById(scriptId);
  const { mutate, isPending } = useStartScript({ id: scriptId });

  if (isLoading || !data) {
    return <Loading />;
  }

  const initialValues = {
    in_params: data.in.map((item) => ({
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
      <ScriptInfo
        script_name={data.name}
        script_description={data.desc || ''}
        owner={Number(data.ownerID) || 0}
        created_at={data.createdAt}
        script_id={0}
        in_fields={[]}
        out_fields={[]}
        file_id={0}
        visibility='private'
      />

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
        {({ handleSubmit, setFieldValue, errors, touched }) => {
          const hasErrorsInHiddenFields =
            data.in.length > 4 &&
            data.in.some((_, index) => {
              if (index >= 4) {
                const paramErrors = errors.in_params?.[index];
                const paramTouched = touched.in_params?.[index];
                if (typeof paramErrors === 'object' && paramErrors !== null) {
                  return paramErrors.data && paramTouched?.data;
                }
              }
              return false;
            });

          return (
            <>
              {data.in.length > 0 ? (
                <CsvUploader
                  onParsed={(csvData, file) => {
                    const isCsvFile =
                      file.name.toLowerCase().endsWith('.csv') ||
                      file.type === 'text/csv' ||
                      file.type === 'application/csv';

                    if (!isCsvFile) {
                      notify('Неверный формат файла. Загрузите CSV-файл', 'error');
                      return;
                    }

                    const { headers, values } = csvData;

                    const fieldIndexMap = new Map<string, number>();
                    data.in.forEach((field, idx) => {
                      fieldIndexMap.set(field.name.toLowerCase().trim(), idx);
                    });

                    // Проверяем дублирующиеся заголовки
                    const seenHeaders = new Set<string>();
                    const duplicateHeaders: string[] = [];
                    headers.forEach((header) => {
                      const normalized = header.toLowerCase().trim();
                      if (seenHeaders.has(normalized)) {
                        duplicateHeaders.push(header);
                      } else {
                        seenHeaders.add(normalized);
                      }
                    });

                    if (duplicateHeaders.length > 0) {
                      notify(
                        `В CSV обнаружены дублирующиеся заголовки колонок: ${duplicateHeaders.join(', ')}. Исправьте файл и попробуйте снова`,
                        'error',
                      );
                      return;
                    }

                    const matchedFields = new Map<number, string>();
                    const extraColumns: string[] = [];
                    let hasEmptyValue = false;
                    let emptyFieldName = '';

                    headers.forEach((header, csvIdx) => {
                      const normalizedHeader = header.toLowerCase().trim();
                      const fieldIdx = fieldIndexMap.get(normalizedHeader);
                      if (fieldIdx !== undefined) {
                        const value = values[csvIdx]?.trim();
                        if (!value) {
                          hasEmptyValue = true;
                          emptyFieldName = header;
                          return;
                        }
                        matchedFields.set(fieldIdx, value);
                      } else {
                        extraColumns.push(header);
                      }
                    });

                    // Проверяем пустые значения
                    if (hasEmptyValue) {
                      notify(
                        `Пустое значение для поля "${emptyFieldName}". Все поля должны быть заполнены`,
                        'error',
                      );
                      return;
                    }

                    if (matchedFields.size !== data.in.length) {
                      const missingFields = data.in
                        .map((field, idx) => (!matchedFields.has(idx) ? field.name : null))
                        .filter((name): name is string => name !== null);
                      notify(`Не найдены значения для полей: ${missingFields.join(', ')}`, 'error');
                      return;
                    }

                    matchedFields.forEach((value, fieldIdx) => {
                      setFieldValue(`in_params[${fieldIdx}].data`, value);
                    });

                    // Предупреждаем о лишних колонках, но не блокируем подстановку значений
                    if (extraColumns.length > 0) {
                      notify(
                        `Данные из CSV подставлены, но обнаружены лишние колонки, которые не соответствуют полям формы: ${extraColumns.join(', ')}`,
                        'warning',
                      );
                      return;
                    }

                    notify('Данные из CSV успешно подставлены', 'success');
                  }}
                />
              ) : null}
              <form onSubmit={handleSubmit} className={styles.form}>
                <ScriptParametrs
                  autoExpand={hasErrorsInHiddenFields}
                  contentClassname={cn(styles.col2)}
                  innerContentClassname={cn(styles.col2)}
                  header={ScriptParametersInputUsecase.header}>
                  {data.in.map((item, id) => {
                    return (
                      <ScriptParametrLayout
                        formikName={`in_params[${id}].data`}
                        key={id}
                        typeOfCard='input'
                        type={item.type}
                        name={item.name}
                        description={item.desc || ''}
                        unit={item.unit || ''}
                      />
                    );
                  })}
                </ScriptParametrs>
                <ScriptParametrs
                  contentClassname={cn(styles.col2)}
                  innerContentClassname={cn(styles.col2)}
                  header={ScriptParametersOutputUsecase.header}>
                  {data.out.map((item, id) => {
                    return (
                      <ScriptParametrLayout
                        key={id}
                        typeOfCard='output'
                        type={item.type}
                        name={item.name}
                        description={item.desc || ''}
                        unit={item.unit || ''}
                      />
                    );
                  })}
                </ScriptParametrs>
                {/* <ScriptSettings /> */}
                <RunCodeButton isLoading={isPending} className={styles.page_runScriptBtn} />
              </form>
            </>
          );
        }}
      </Formik>
    </PageLayout>
  );
}
