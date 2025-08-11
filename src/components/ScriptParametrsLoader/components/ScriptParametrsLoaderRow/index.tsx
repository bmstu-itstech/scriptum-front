import InputLayout from '@/layouts/InputLayout';
import styles from '@/components/ScriptParametrsLoader/components/ScriptParametrsLoaderRow/ScriptParametersLoader.module.css';
import { usecase } from '@/components/ScriptParametrsLoader/components/ScriptParametrsLoaderRow/ScriptParametersLoader.usecase';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { memo, useCallback, useMemo, type FC } from 'react';
import cn from 'classnames';
import { Filter } from '@/components/Filter/Filter';
import { measureUsecase, typeUsecase } from '@/components/Filter/Filter.usecase';
import { useField, useFormikContext, type FormikErrors } from 'formik';
import { ScriptFormValues, type Parameter } from '@/app/(withHeader)/script/create/page.usecase';

interface RowProps {
  index: number;
  arrayName: string; // 'inputParams' или 'outputParams'
  onRemove: () => void;
  className?: string;
}

const ScriptParametersLoaderRow: FC<RowProps> = ({
  index,
  arrayName,
  onRemove,
  className,
}) => {
  const { setFieldValue, setFieldTouched } = useFormikContext<ScriptFormValues>();

  const [nameField, nameMeta] = useField<string>(`${arrayName}[${index}].name`);
  const [descField, descMeta] = useField<string>(`${arrayName}[${index}].desc`);
  const [typeField, typeMeta] = useField<string>(`${arrayName}[${index}].type`);
  const [measureField, measureMeta] = useField<string>(`${arrayName}[${index}].measure`);

  const handleFieldChange = useCallback((fieldName: keyof Parameter, value: string) => {
    setFieldValue(`${arrayName}[${index}].${fieldName}`, value);
  }, [arrayName, index, setFieldValue, onRemove]);


  return (
    <div className={`${styles.row} animationAppear ${className}`}>
      <InputLayout
        errorText={nameMeta.touched && nameMeta.error ? nameMeta.error : null}
        type="text"
        placeholder={usecase.name.placeholder}
        className={styles.input}
        {...nameField}
      />

      <InputLayout
        errorText={descMeta.touched && descMeta.error ? descMeta.error : null}
        type="text"
        placeholder={usecase.desc.placeholder}
        className={styles.input}
        {...descField}
      />

      <Filter
        index={index}
        options={typeUsecase}
        placeholder="Выберите тип"
        name={typeField.name}
        value={typeField.value}
        // {...typeField}
        onBlur={() => setFieldTouched(typeField.name, true, true)}
        onChange={(value: string) => handleFieldChange('type', value)}
        selectClassName={styles.filter__type}
        errorText={typeMeta.touched && typeMeta.error ? typeMeta.error : null}

      />

      <Filter
        index={index+10000}
        options={measureUsecase}
        placeholder="Выберите единицу измерения"
        name={measureField.name}
        value={measureField.value}
        // {...measureField}
        onBlur={() => setFieldTouched(measureField.name, true, true)}
        onChange={(value: string) => handleFieldChange('measure', value)}
        selectClassName={styles.filter__measure}
        errorText={measureMeta.touched && measureMeta.error ? measureMeta.error : null}
      />

      <button
        title='del'
        type='button'
        onClick={() => onRemove()}
        className={cn(styles.scriptElement__delIcon, 'smoothTransition')}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

export default memo(ScriptParametersLoaderRow);