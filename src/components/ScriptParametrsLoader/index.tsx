'use client';
import { ScriptParametrsLayout } from '@/layouts/ScriptParametrsLayout';
import { useMemo, type FC } from 'react';
import { Props } from '@/components/ScriptParametrsLoader/ScriptParametrsLoader.props';
import { pageCreateUsecase } from '@/app/(withHeader)/script/create/page.usecase';
import cn from 'classnames';
import stylesLayout from '@/layouts/ScriptParametrsLayout/ScriptParametrsLayout.module.css';
import styles from '@/components/ScriptParametrsLoader/ScriptParametersLoader.module.css';
import { Button } from '@/layouts/Button';
import { AddParametrIcon } from '@/components/icons/AddParametricon';
import ScriptParametersLoaderRow from '@/components/ScriptParametrsLoader/components/ScriptParametrsLoaderRow/index';
import { DocumentNoParamsIcon } from '@/components/icons/DocumentNoParamsIcon';
import { FieldArray } from 'formik';
import { ExtendedBlock } from '@/shared/ExtendedBlock';

export const ScriptParametrsLoader: FC<Props> = ({ params, type, className, ...props }) => {
  const name = type === 'input' ? 'inputParams' : 'outputParams';

  const PreBlock = useMemo(() => {
    if (params.length === 0) {
      return (
        <div className={styles.preblock}>
          <DocumentNoParamsIcon className={styles.preblock__icon} />
          <p className={styles.preblock__text}>Параметры не добавлены</p>
          <p className={styles.preblock__subtext}>
            Нажмите &quot;Добавить параметр&quot; для начала
          </p>
        </div>
      );
    }
    return (
      <div className={cn(styles.headerList, styles.listBorder)}>
        {(type === 'input' ? pageCreateUsecase.input.blocks : pageCreateUsecase.output.blocks).map(
          (block, ind) => (
            <p key={ind} className={cn(`layout__title-sm`, styles.headerItem)}>
              {block}
            </p>
          ),
        )}
      </div>
    );
  }, [params.length, type]);

  return (
    <FieldArray name={name}>
      {({ remove, push }) => (
        <ScriptParametrsLayout
          className={className}
          headerClassname={stylesLayout.smallPadding}
          header={
            <div className={cn(styles.headerList, styles.justifyBetween)}>
              <div className={styles.headerList__left}>
                <p className={cn('layout__title-sm', styles.headerName)}>
                  {type === 'input' ? 'Входные параметры' : 'Выходные параметры'}
                </p>
                <p className={styles.headerList_subtitle}>Количество параметров: {params.length}</p>
              </div>

              <Button
                className={styles.addButton}
                onClick={() =>
                  push({
                    id: crypto.randomUUID(),
                    name: '',
                    desc: '',
                    type: '',
                    measure: '',
                  })
                }
                icon={<AddParametrIcon className={styles.addIcon} />}>
                Добавить параметр
              </Button>
            </div>
          }
          {...props}>
          {PreBlock}
          <ExtendedBlock
            mainExtendedClassname={styles.extendedBlock__main}
            contentClassname={styles.extendedBlock__content}>
            {params.map((row, ind) => (
              <ScriptParametersLoaderRow
                key={row.id}
                arrayName={name}
                index={ind}
                onRemove={() => remove(ind)}
                {...row}
              />
            ))}
          </ExtendedBlock>
        </ScriptParametrsLayout>
      )}
    </FieldArray>
  );
};
