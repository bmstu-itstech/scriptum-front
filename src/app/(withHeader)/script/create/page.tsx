'use client'
import { PageLayout } from '@/layouts/PageLayout';
import { pageCreateUsecase, ScriptInitialValues } from '@/app/(withHeader)/script/create/page.usecase';
import InputLayout from '@/layouts/InputLayout';
import { InfoBlockLayout } from '@/layouts/InfoBlockLayout';
import styles from '@/app/(withHeader)/script/create/page.module.css';
import { ScriptParametrsLoader } from '@/components/ScriptParametrsLoader';
import { Formik, Form, FastField, Field } from 'formik';
import { Button } from '@/layouts/Button';
import { ScriptSchema } from '@/app/(withHeader)/script/create/page.usecase';
import { SaveScriptIcon } from '@/components/icons/SaveScriptIcon';


export default function CreatePage() {

  // console.log('страница перерендерилпсь')
  return (
    <PageLayout>
      <Formik
        initialValues={ScriptInitialValues}
        onSubmit={(values) => {
          console.log(values);
          alert('Я ОТПРАВИЛ')
        }}
        validationSchema={ScriptSchema}
      >
        {({ handleSubmit, handleBlur, setFieldValue, values, errors, touched }) => (
          <Form onSubmit={handleSubmit} className={styles.form}>
            <InfoBlockLayout
              headerClassname={styles.infoblock__header}
              contentClassname={styles.infoblock__content}
              className={styles.infoblock}
              header={pageCreateUsecase.main.header}
            >
              <div className={styles.flex}>
                <FastField name={`name`}>
                  {({ field}: any) => (
                    <InputLayout
                      type='text'
                      value={field.value ?? ''}
                      inputTitle={pageCreateUsecase.main.blocks.scriptTitle.title}
                      className={styles.input}
                      placeholder={pageCreateUsecase.main.blocks.scriptTitle.placeholder}
                      errorText={errors.name && touched.name ? errors.name : null}
                      {...field}
                      
                    />
                  )}
                </FastField>
                <FastField name={`file`}>
                  {({ field }: any) => (
                    <InputLayout
                      type='file'
                      name={field.name}
                      value={field.value ?? ''}
                      onChange={(event) => {
                        setFieldValue('file', event.currentTarget.files?.[0]);
                      }}
                      inputTitle={pageCreateUsecase.main.blocks.scriptCode.title}
                      placeholder={pageCreateUsecase.main.blocks.scriptCode.placeholder}
                      errorText={errors.file && touched.file ? errors.file : null}
                      onBlur={handleBlur}
                    />
                  )}
                </FastField>

              </div>
              <FastField name={`desc`}>
                {({ field }: any) => (
                  <InputLayout
                    type='text'
                    inputTitle={pageCreateUsecase.main.blocks.scriptDesc.title}
                    className={styles.input}
                    isTextArea
                    inputClassName={styles.desc}
                    value={field.value ?? ''}
                    placeholder={pageCreateUsecase.main.blocks.scriptDesc.placeholder}
                    errorText={errors.desc && touched.desc ? errors.desc : null}
                    {...field}

                  />
                )}
              </FastField>
            </InfoBlockLayout>
            <ScriptParametrsLoader type='input' />
            <ScriptParametrsLoader type='output' />
            <Button className={styles.saveBtn} icon={<SaveScriptIcon />} type='submit'>Сохранить скрипт</Button>
          </Form>
        )}
      </Formik>
    </PageLayout>
  );
}