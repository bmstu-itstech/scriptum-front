import {InputLayout} from '@/layouts/InputLayout';
import styles from '@/components/ScriptParametrsLoader/components/ScriptParametrsLoaderRow/ScriptParametersLoader.module.css';
import {usecase} from '@/components/ScriptParametrsLoader/components/ScriptParametrsLoaderRow/ScriptParametersLoader.usecase';
import {DeleteIcon} from '@/components/icons/DeleteIcon';
import {useState, type FC} from 'react';
import {Props} from '@/components/ScriptParametrsLoader/components/ScriptParametrsLoaderRow/ScriptParametersLoaderRow.props';
import cn from 'classnames';
import {Filter} from '@/components/Filter/Filter';
import {measureUsecase, typeUsecase} from '@/components/Filter/Filter.usecase';

export const ScriptParametersLoaderRow: FC<Props> = ({
  measureValue,
  typeValue,
  className,
  ...props
}) => {
  return (
    <div className={`${styles.row} ${className}`} {...props}>
      <InputLayout
        errorText={usecase.name.error}
        type='text'
        placeholder={usecase.name.placeholder}
        className={styles.input}
      />

      <InputLayout
        errorText={usecase.desc.error}
        type='text'
        placeholder={usecase.desc.placeholder}
        className={styles.input}
      />
      <Filter
        name='typeFilter'
        options={typeUsecase}
        value={typeValue}
        placeholder='Выберите тип'
        callback={() => {}}
        className={styles.filter__type}
      />
      <Filter
        name='measureFilter'
        options={measureUsecase}
        value={measureValue}
        placeholder='Выберите единицу измерения'
        callback={() => {}}
        className={styles.filter__measure}
      />
      <span
        onClick={e => {
          //   e.preventDefault();
          //   handleDeleteClick(scriptId);
        }}
        className={cn(styles.scriptElement__delIcon, 'smoothTransition')}>
        <DeleteIcon />
      </span>
    </div>
  );
};
