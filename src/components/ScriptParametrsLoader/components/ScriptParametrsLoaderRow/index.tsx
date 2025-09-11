import InputLayout from '@/layouts/InputLayout';
import styles from '@/components/ScriptParametrsLoader/components/ScriptParametrsLoaderRow/ScriptParametersLoader.module.css';
import { usecase } from '@/components/ScriptParametrsLoader/components/ScriptParametrsLoaderRow/ScriptParametersLoader.usecase';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { memo, type FC } from 'react';
import cn from 'classnames';
import { Filter } from '@/components/Filter/Filter';
import { measureUsecase, typeUsecase } from '@/components/Filter/Filter.usecase';
import { FastField, type FastFieldProps } from 'formik';

interface RowProps {
  index: number;
  arrayName: string; // 'inputParams' или 'outputParams'
  onRemove: () => void;
  className?: string;
}

const ScriptParametersLoaderRow: FC<RowProps> = ({ index, arrayName, onRemove, className }) => {
  return (
    <div className={`${styles.row} animationAppear ${className}`}>
      <FastField name={`${arrayName}[${index}].name`}>
        {({ field, meta }: FastFieldProps) => (
          <InputLayout
            type='text'
            name={field.name}
            placeholder={usecase.name.placeholder}
            value={field.value}
            onChange={field.onChange}
            className={styles.input}
            onBlur={field.onBlur}
            errorText={meta.touched && meta.error ? meta.error : null}
          />
        )}
      </FastField>

      <FastField name={`${arrayName}[${index}].desc`}>
        {({ field, meta }: FastFieldProps) => (
          <InputLayout
            type='text'
            name={field.name}
            placeholder={usecase.desc.placeholder}
            value={field.value}
            onChange={field.onChange}
            className={styles.input}
            onBlur={field.onBlur}
            errorText={meta.touched && meta.error ? meta.error : null}
          />
        )}
      </FastField>

      <FastField name={`${arrayName}[${index}].type`}>
        {({ field, meta }: FastFieldProps) => (
          <Filter
            name={field.name}
            index={index}
            options={typeUsecase}
            placeholder='Выберите тип'
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            errorText={meta.touched && meta.error ? meta.error : null}
            selectClassName={styles.filter__type}
            // className={styles.filter__type}
            isFormik
          />
        )}
      </FastField>

      <FastField name={`${arrayName}[${index}].measure`}>
        {({ field, meta }: FastFieldProps) => (
          <InputLayout
            type='text'
            name={field.name}
            placeholder={usecase.name.placeholder}
            value={field.value}
            onChange={field.onChange}
            className={styles.input}
            onBlur={field.onBlur}
            errorText={meta.touched && meta.error ? meta.error : null}
          />
        )}
      </FastField>

      <button
        title='del'
        type='button'
        onClick={() => onRemove()}
        className={cn(styles.scriptElement__delIcon, 'smoothTransition')}>
        <DeleteIcon />
      </button>
    </div>
  );
};

export default memo(ScriptParametersLoaderRow);
