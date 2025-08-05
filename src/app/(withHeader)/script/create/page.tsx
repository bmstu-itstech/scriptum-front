'use client'
import { PageLayout } from '@/layouts/PageLayout';
import { pageCreateUsecase } from '@/app/(withHeader)/script/create/page.usecase';
import { InputLayout } from '@/layouts/InputLayout';
import { InfoBlockLayout } from '@/layouts/InfoBlockLayout';
import styles from '@/app/(withHeader)/script/create/page.module.css';
import { ScriptParametrsLoader } from '@/components/ScriptParametrsLoader';
import { Formik, Form } from 'formik';
import { Button } from '@/layouts/Button';
import { ScriptSchema } from '@/app/(withHeader)/script/create/page.usecase';
import { SaveScriptIcon } from '@/components/icons/SaveScriptIcon';


export interface IFormik {
  name: string,
  desc: string,
  file: File,
  inputParams: [name: string, desc: string, type: string, measure: string],
  outputParams: [name: string, desc: string, type: string, measure: string]
}

export default function CreatePage() {
  return (
    <PageLayout>
      <Formik
        initialValues={{
          name: '', desc: '', file: null, inputParams: [], outputParams: []
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={ScriptSchema}
      >
        {({ handleSubmit, handleChange, setFieldValue, values, errors, touched }) => (
          <Form onSubmit={handleSubmit} className={styles.form}>
            <InfoBlockLayout
              headerClassname={styles.infoblock__header}
              contentClassname={styles.infoblock__content}
              className={styles.infoblock}
              header={pageCreateUsecase.main.header}
            >
              <div className={styles.flex}>
                <InputLayout
                  type='text'
                  name='name'
                  value={values.name}
                  onChange={handleChange}
                  inputTitle={pageCreateUsecase.main.blocks.scriptTitle.title}
                  placeholder={pageCreateUsecase.main.blocks.scriptTitle.placeholder}
                  errorText={errors.name && touched.name ? errors.name : null}
                />
                <InputLayout
                  type='file'
                  name='file'
                  value=''
                  onChange={(event) => {
                    setFieldValue('file', event.currentTarget.files?.[0]);
                  }}
                  inputTitle={pageCreateUsecase.main.blocks.scriptCode.title}
                  placeholder={pageCreateUsecase.main.blocks.scriptCode.placeholder}
                  errorText={errors.file && touched.file ? errors.file : null}
                />
              </div>
              <InputLayout
                type='text'
                name='desc'
                value={values.desc}
                isTextArea
                onChange={handleChange}
                inputClassName={styles.desc}
                inputTitle={pageCreateUsecase.main.blocks.scriptDesc.title}
                placeholder={pageCreateUsecase.main.blocks.scriptDesc.placeholder}
                errorText={errors.desc && touched.desc ? errors.desc : null}
              />
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