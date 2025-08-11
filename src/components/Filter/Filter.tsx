'use client';
import type Props from '@/components/Filter/Filter.props';
import { type FC, type ReactElement } from 'react';
import cn from 'classnames';
import styles from '@/components/Filter/Filter.module.css';
import Select, { type SingleValue, type ActionMeta, components, type ControlProps, SelectComponentsConfig } from 'react-select';
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
  options = [],
  ...props
}) => {
  
  const handleChange = (newValue: SingleValue<Option>) => {
    onChange?.(newValue?.value ?? '');
  };

  const selectedOption = options.find(option => option.value === value) || null;

  const Control = ({ children, ...props }: ControlProps<Option, false>) => (
    <components.Control {...props}>
      {icon && <span className={styles.filter__icon}>{icon}</span>}
      {children}
    </components.Control>
  );

  return (
    <div className={cn(styles.filter, className)}>
      <Select<Option>
        className={cn(styles.filter__select, 'smoothTransition', selectClassName)}
        classNamePrefix='select'
        value={selectedOption}
        onChange={handleChange}
        onBlur={onBlur}
        options={options}
        placeholder={placeholder}
        instanceId={`inputParam-type-${index}`}
        name={name}
        menuPortalTarget={typeof window !== 'undefined' ? document.body : undefined}
        isSearchable={false}
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
