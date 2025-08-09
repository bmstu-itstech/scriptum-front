import InputLayout from '@/layouts/InputLayout';
import styles from '@/components/ScriptParametrsLoader/components/ScriptParametrsLoaderRow/ScriptParametersLoader.module.css';
import { usecase } from '@/components/ScriptParametrsLoader/components/ScriptParametrsLoaderRow/ScriptParametersLoader.usecase';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { memo, useCallback, useMemo, type FC } from 'react';
import cn from 'classnames';
import { Filter } from '@/components/Filter/Filter';
import { measureUsecase, typeUsecase } from '@/components/Filter/Filter.usecase';
import { useFormikContext, type FormikErrors } from 'formik';
import { ScriptFormValues, type Parameter } from '@/app/(withHeader)/script/create/page.usecase';

interface RowProps {
  index: number;
  arrayName: string; // 'inputParams' или 'outputParams'
  onRemove: (index: number) => void;
  className?: string;
}

const ScriptParametersLoaderRow: FC<RowProps> = ({
  index,
  arrayName,
  onRemove,
  className,
}) => {
  const { values, setFieldValue, errors, touched } = useFormikContext<ScriptFormValues>();

  const getError = (fieldName: keyof Parameter) => {
    const arrayErrors = errors[arrayName] as FormikErrors<Parameter>[] | undefined;
    const arrayTouched = touched[arrayName] as { [key in keyof Parameter]?: boolean }[] | undefined;

    if (arrayErrors?.[index]?.[fieldName] && arrayTouched?.[index]?.[fieldName]) {
      return arrayErrors[index][fieldName];
    }
    return '';
  };

  const handleFieldChange = useCallback((fieldName: keyof Parameter, value: string) => {
    setFieldValue(`${arrayName}[${index}].${fieldName}`, value);
  }, [arrayName, index, setFieldValue]);

  return (
    <div className={`${styles.row} animationAppear ${className}`}>
      <InputLayout
        errorText={getError('name')}
        type="text"
        placeholder={usecase.name.placeholder}
        className={styles.input}
        name={`${arrayName}[${index}].name`}
        value={values[arrayName][index]?.name || ''}
        onChange={(e) => handleFieldChange('name', e.currentTarget.value)}
      />

      <InputLayout
        errorText={getError('desc')}
        type="text"
        placeholder={usecase.desc.placeholder}
        className={styles.input}
        name={`${arrayName}[${index}].desc`}
        value={values[arrayName][index]?.desc || ''}
        onChange={(e) => handleFieldChange('desc', e.currentTarget.value)}
      />

      <Filter
        errorText={getError('type')}
        name={`${arrayName}[${index}].type`}
        options={typeUsecase}
        value={values[arrayName][index]?.type || ''}
        placeholder="Выберите тип"
        callback={(value: string) => handleFieldChange('type', value)}
        selectClassName={styles.filter__type}
      />

      <Filter
        errorText={getError('measure')}
        name={`${arrayName}[${index}].measure`}
        options={measureUsecase}
        value={values[arrayName][index]?.measure || ''}
        placeholder="Выберите единицу измерения"
        callback={(value: string) => handleFieldChange('measure', value)}
        selectClassName={styles.filter__measure}
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

export default memo(ScriptParametersLoaderRow);