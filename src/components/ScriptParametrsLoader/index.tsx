'use client';
import { ScriptParametrsLayout } from '@/layouts/ScriptParametrsLayout';
import { useCallback, useMemo, useState, type FC } from 'react';
import { Props } from '@/components/ScriptParametrsLoader/ScriptParametrsLoader.props';
import { pageCreateUsecase, type ScriptFormValues } from '@/app/(withHeader)/script/create/page.usecase';
import cn from 'classnames';
import stylesLayout from '@/layouts/ScriptParametrsLayout/ScriptParametrsLayout.module.css';
import styles from '@/components/ScriptParametrsLoader/ScriptParametersLoader.module.css';
import { Button } from '@/layouts/Button';
import { AddParametrIcon } from '@/components/icons/AddParametricon';
import ScriptParametersLoaderRow from '@/components/ScriptParametrsLoader/components/ScriptParametrsLoaderRow/index';
import { DocumentNoParamsIcon } from '@/components/icons/DocumentNoParamsIcon';
import { useFormikContext } from 'formik';
import { FieldArray } from 'formik';
import { ExtendedBlock } from '@/shared/ExtendedBlock';

export const ScriptParametrsLoader: FC<Props> = ({ type, className, ...props }) => {
  const { values } = useFormikContext<ScriptFormValues>();
  const name = type === 'input' ? 'inputParams' : 'outputParams';
  const params = values[name] || [];
  
  const PreBlock = useMemo(() => {
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
  }, [params]);

  return (
    <FieldArray name={name}>
      {({ remove, push }) => (
        <ScriptParametrsLayout
          className={className}
          headerClassname={stylesLayout.smallPadding}
          header={
            <div className={cn(styles.headerList, styles.justifyBetween)}>
              <p className={cn('layout__title-sm', styles.headerName)}>
                {type === 'input' ? 'Входные параметры' : 'Выходные параметры'}
              </p>
              <Button
                className={styles.addButton}
                onClick={() => push({
                  name: '',
                  desc: '',
                  type: '',
                  measure: '',
                })}
                icon={<AddParametrIcon className={styles.addIcon} />}
              >
                Добавить параметр
              </Button>
            </div>
          }

          {...props}
        >
          {PreBlock}
          <ExtendedBlock
            mainExtendedClassname={styles.extendedBlock__main}
            contentClassname={styles.extendedBlock__content}>

            {params.map((row, index) => (
              <ScriptParametersLoaderRow
                key={index}
                arrayName={name}
                index={index}
                onRemove={() => remove(index)}
                {...row}
              />
            ))

            }
          </ExtendedBlock>
        </ScriptParametrsLayout>
      )}
    </FieldArray>

  );
};