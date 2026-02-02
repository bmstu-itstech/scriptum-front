'use client';
import { FC, memo } from 'react';
import { FastField, type FastFieldProps } from 'formik';
import { InfoBlockLayout } from '@/layouts/InfoBlockLayout';
import InputLayout from '@/layouts/InputLayout';
import { pageCreateUsecase } from '@/app/(withHeader)/script/create/page.usecase';
import styles from '@/app/(withHeader)/script/create/page.module.css';

export const ScriptFormInfoBlock: FC = memo(() => {
  return (
    <InfoBlockLayout
      headerClassname={styles.infoblock__header}
      contentClassname={styles.infoblock__content}
      className={styles.infoblock}
      header={pageCreateUsecase.main.header}>
      <div className={styles.flex}>
        <FastField name='name'>
          {({ form, field, meta }: FastFieldProps) => (
            <InputLayout
              type='text'
              inputTitle={pageCreateUsecase.main.blocks.scriptTitle.title}
              className={styles.input}
              placeholder={pageCreateUsecase.main.blocks.scriptTitle.placeholder}
              errorText={meta.touched && meta.error ? meta.error : null}
              {...field}
              onChange={(value) => form.setFieldValue(field.name, value)}
            />
          )}
        </FastField>

        <FastField name='file'>
          {({ field, meta }: FastFieldProps) => (
            <InputLayout
              type='file'
              value={field.value ?? ''}
              name={field.name}
              inputTitle={pageCreateUsecase.main.blocks.scriptCode.title}
              placeholder={pageCreateUsecase.main.blocks.scriptCode.placeholder}
              errorText={meta.touched && meta.error ? meta.error : null}
              onBlur={field.onBlur}
            />
          )}
        </FastField>
      </div>

      <FastField name='desc'>
        {({ form, field, meta }: FastFieldProps) => (
          <InputLayout
            type='text'
            inputTitle={pageCreateUsecase.main.blocks.scriptDesc.title}
            className={styles.input}
            isTextArea
            inputClassName={styles.desc}
            placeholder={pageCreateUsecase.main.blocks.scriptDesc.placeholder}
            errorText={meta.touched && meta.error ? meta.error : null}
            {...field}
            onChange={(value) => form.setFieldValue(field.name, value)}
          />
        )}
      </FastField>
    </InfoBlockLayout>
  );
});

ScriptFormInfoBlock.displayName = 'ScriptFormInfoBlock';
