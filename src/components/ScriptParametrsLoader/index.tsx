'use client';
import { ScriptParametrsLayout } from '@/layouts/ScriptParametrsLayout';
import { useCallback, useState, type FC } from 'react';
import { Props } from '@/components/ScriptParametrsLoader/ScriptParametrsLoader.props';
import { pageCreateUsecase } from '@/app/(withHeader)/script/create/page.usecase';
import cn from 'classnames';
import stylesLayout from '@/layouts/ScriptParametrsLayout/ScriptParametrsLayout.module.css';
import styles from '@/components/ScriptParametrsLoader/ScriptParametersLoader.module.css';
import { ScriptParametersLoaderRowProps } from '@/components/ScriptParametrsLoader/components/ScriptParametrsLoaderRow/ScriptParametersLoaderRow.props';
import { Button } from '@/layouts/Button';
import { AddParametrIcon } from '@/components/icons/AddParametricon';
import { ScriptParametersLoaderRow } from '@/components/ScriptParametrsLoader/components/ScriptParametrsLoaderRow/index';
import { DocumentNoParamsIcon } from '@/components/icons/DocumentNoParamsIcon';

export const ScriptParametrsLoader: FC<Props> = ({ type, className, ...props }) => {
  const [params, setParams] = useState<ScriptParametersLoaderRowProps[]>([]);

  const onClick = useCallback(() => {
    setParams(prev => [...prev, { name: '', desc: '', measure: '', type: '' }]);
  }, []);

  const [parametrType, setParametrType] = useState('');
  const [parametrMeasure, setParametrMeasure] = useState('');

  const PreBlock = () => {
    if (params.length === 0) {
      return (<div className={styles.preblock}>
        <DocumentNoParamsIcon className={styles.preblock__icon} />
        <p className={styles.preblock__text}>Параметры не добавлены</p>
        <p className={styles.preblock__subtext}>Нажмите "Добавить параметр" для начала</p>
      </div>);
    }
    return (

      <div className={cn(styles.headerList, styles.justifyBetween)}>
        {(type == 'input' ? pageCreateUsecase.input.blocks : pageCreateUsecase.output.blocks).map(
          (block, ind) => {
            return (
              <p key={ind} className={cn(`layout__title-sm`, styles.headerItem)}>
                {block}
              </p>
            );
          },
        )}
      </div>
    )
  }




  return (
    <ScriptParametrsLayout
      className={className}
      mainExtendedClassname={styles.extendedBlock__main}
      headerClassname={stylesLayout.smallPadding}
      header={
        type == 'input' ? (
          <div className={cn(styles.headerList, styles.justifyBetween)}>
            <p className={cn('layout__title-sm', styles.headerName)}>Входные параметры</p>
            <Button
              className={styles.addButton}
              onClick={onClick}
              icon={<AddParametrIcon className={styles.addIcon} />}>
              Добавить параметр
            </Button>
          </div>
        ) : (
          <div className={cn(styles.headerList, styles.justifyBetween)}>
            <p className={cn('layout__title-sm', styles.headerName)}>Выходные параметры</p>
            <Button
              className={styles.addButton}
              onClick={onClick}
              icon={<AddParametrIcon className={styles.addIcon} />}>
              Добавить параметр
            </Button>
          </div>
        )
      }
      preBlock={<PreBlock />}
      {...props}>
      {params.map((row, ind) => {
        return (
          <ScriptParametersLoaderRow
            measureValue={parametrMeasure}
            typeValue={parametrType}
            key={ind}
          />
        );
      })}
    </ScriptParametrsLayout>
  );
};
