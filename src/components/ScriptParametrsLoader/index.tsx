'use client';
import { ScriptParametrsLayout } from '@/layouts/ScriptParametrsLayout';
import { useCallback, useState, type FC } from 'react';
import { Props } from '@/components/ScriptParametrsLoader/ScriptParametrsLoader.props';
import { pageCreateUsecase, type ScriptFormValues } from '@/app/(withHeader)/script/create/page.usecase';
import cn from 'classnames';
import stylesLayout from '@/layouts/ScriptParametrsLayout/ScriptParametrsLayout.module.css';
import styles from '@/components/ScriptParametrsLoader/ScriptParametersLoader.module.css';
import { Button } from '@/layouts/Button';
import { AddParametrIcon } from '@/components/icons/AddParametricon';
import  ScriptParametersLoaderRow  from '@/components/ScriptParametrsLoader/components/ScriptParametrsLoaderRow/index';
import { DocumentNoParamsIcon } from '@/components/icons/DocumentNoParamsIcon';
import { useFormikContext } from 'formik';


export const ScriptParametrsLoader: FC<Props> = ({ type, className, ...props }) => {
  const { values, setFieldValue } = useFormikContext<ScriptFormValues>();
  const name = type === 'input' ? 'inputParams' : 'outputParams';
  const params = values[name] || [];

  const addParam = () => {
    setFieldValue(name, [
      ...params,
      { name: '', desc: '', measure: '', type: '' }
    ]);
  };

  const removeParam = (index: number) => {
    const filtered = params.filter((_, i) => i !== index);
    setFieldValue(name, filtered);
  };

  const PreBlock = () => {
    if (params.length === 0) {
      return (
        <div className={styles.preblock}>
          <DocumentNoParamsIcon className={styles.preblock__icon} />
          <p className={styles.preblock__text}>Параметры не добавлены</p>
          <p className={styles.preblock__subtext}>Нажмите "Добавить параметр" для начала</p>
        </div>
      );
    }
    return (
      <div className={cn(styles.headerList, styles.justifyBetween)}>
        {(type === 'input' ? pageCreateUsecase.input.blocks : pageCreateUsecase.output.blocks).map(
          (block, ind) => (
            <p key={ind} className={cn(`layout__title-sm`, styles.headerItem)}>
              {block}
            </p>
          )
        )}
      </div>
    );
  };

  return (
    <ScriptParametrsLayout
      className={className}
      mainExtendedClassname={styles.extendedBlock__main}
      headerClassname={stylesLayout.smallPadding}
      header={
        <div className={cn(styles.headerList, styles.justifyBetween)}>
          <p className={cn('layout__title-sm', styles.headerName)}>
            {type === 'input' ? 'Входные параметры' : 'Выходные параметры'}
          </p>
          <Button
            className={styles.addButton}
            onClick={addParam}
            icon={<AddParametrIcon className={styles.addIcon} />}
          >
            Добавить параметр
          </Button>
        </div>
      }
      preBlock={<PreBlock />}
      {...props}
    >
      {params.map((row, index) => (
        <ScriptParametersLoaderRow
          key={index}
          arrayName={name}
          index={index}
          onRemove={removeParam}
          {...row}
        />
      ))}
    </ScriptParametrsLayout>
  );
};