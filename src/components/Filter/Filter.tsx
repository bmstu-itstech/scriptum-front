'use client';
import type Props from '@/components/Filter/Filter.props';
import cn from 'classnames';
import styles from '@/components/Filter/Filter.module.css';
import Select, { type SingleValue, components, type ControlProps } from 'react-select';
import { colourStyles, Option, selectStyles } from '@/components/Filter/Filter.usecase';

export const Filter: React.FC<Props> = ({
  name,
  value,
  icon,
  placeholder,
  className,
  index,
  onChange,
  onBlur,
  selectClassName,
  errorText = null,
  style,
  isFormik = false,
  options = [],
  ...props
}) => {
  const handleChange = (newValue: SingleValue<Option>) => {
    onChange?.(newValue?.value ?? '');
  };

  const handleChangeFormik = (newValue: SingleValue<Option>) => {
    onChange({
      target: {
        name,
        value: newValue?.value ?? '',
      },
    });
  };

  const handleBlur = () => {
    onBlur?.({ target: { name } });
  };

  const selectedOption = options.find((option) => option.value === value) || null;

  const Control = ({ children, ...props }: ControlProps<Option, false>) => (
    <components.Control {...props}>
      {icon && <span className={styles.filter__icon}>{icon}</span>}
      {children}
    </components.Control>
  );

  return (
    <div className={cn(styles.filter, className)}>
      <Select<Option>
        className={cn(styles.filter__select, 'smoothTransition', selectClassName, {
          [styles.error]: errorText,
        })}
        classNamePrefix='select'
        value={selectedOption}
        onChange={isFormik ? handleChangeFormik : handleChange}
        onBlur={handleBlur}
        options={options}
        placeholder={placeholder}
        tabSelectsValue={false}
        instanceId={`inputParam-type-${index}`}
        name={name}
        menuPortalTarget={typeof window !== 'undefined' ? document.body : undefined}
        isSearchable={true}
        components={{
          Control,
          IndicatorSeparator: () => null,
        }}
        styles={style ? { ...colourStyles, ...style } : { ...colourStyles, ...selectStyles }}
        {...props}
      />
      {errorText && <span className={cn(styles.errorText)}>{errorText}</span>}
    </div>
  );
};
