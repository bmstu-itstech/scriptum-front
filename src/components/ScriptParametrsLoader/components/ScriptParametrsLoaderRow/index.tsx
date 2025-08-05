import { InputLayout } from '@/layouts/InputLayout';
import styles from '@/components/ScriptParametrsLoader/components/ScriptParametrsLoaderRow/ScriptParametersLoader.module.css';
import { usecase } from '@/components/ScriptParametrsLoader/components/ScriptParametrsLoaderRow/ScriptParametersLoader.usecase';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { type FC } from 'react';
import { Props } from '@/components/ScriptParametrsLoader/components/ScriptParametrsLoaderRow/ScriptParametersLoaderRow.props';
import cn from 'classnames';
import { Filter } from '@/components/Filter/Filter';
import { measureUsecase, typeUsecase } from '@/components/Filter/Filter.usecase';
import { useFormikContext } from 'formik';

interface RowProps {
  index: number;
  arrayName: string; // 'inputParams' или 'outputParams'
  onRemove: (index: number) => void;
  className?: string;
}

export const ScriptParametersLoaderRow: FC<RowProps> = ({
  index,
  arrayName,
  onRemove,
  className,
}) => {
  const { values, setFieldValue } = useFormikContext<any>();

  const handleFieldChange = (fieldName: string, value: string) => {
    setFieldValue(`${arrayName}[${index}].${fieldName}`, value);
  };

  return (
    <div className={`${styles.row} ${className}`}>
      <InputLayout
        errorText={usecase.name.error}
        type="text"
        placeholder={usecase.name.placeholder}
        className={styles.input}
        name={`${arrayName}[${index}].name`}
        value={values[arrayName][index]?.name || ''}
        onChange={(e) => handleFieldChange('name', e.currentTarget.value)}
      />

      <InputLayout
        errorText={usecase.desc.error}
        type="text"
        placeholder={usecase.desc.placeholder}
        className={styles.input}
        name={`${arrayName}[${index}].desc`}
        value={values[arrayName][index]?.desc || ''}
        onChange={(e) => handleFieldChange('desc', e.currentTarget.value)}
      />

      <Filter
        name={`${arrayName}[${index}].type`}
        options={typeUsecase}
        value={values[arrayName][index]?.type || ''}
        placeholder="Выберите тип"
        callback={(value: string) => handleFieldChange('type', value)}
        className={styles.filter__type}
      />

      <Filter
        name={`${arrayName}[${index}].measure`}
        options={measureUsecase}
        value={values[arrayName][index]?.measure || ''}
        placeholder="Выберите единицу измерения"
        callback={(value: string) => handleFieldChange('measure', value)}
        className={styles.filter__measure}
      />

      <span
        onClick={() => onRemove(index)}
        className={cn(styles.scriptElement__delIcon, 'smoothTransition')}
      >
        <DeleteIcon />
      </span>
    </div>
  );
};