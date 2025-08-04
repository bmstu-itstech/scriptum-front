'use client';
import type Props from '@/components/Filter/Filter.props';
import {type FC, type ReactElement} from 'react';
import cn from 'classnames';
import styles from '@/components/Filter/Filter.module.css';
import Select, {type SingleValue, type ActionMeta, components, type ControlProps} from 'react-select';
import {colourStyles, Option} from '@/components/Filter/Filter.usecase';


export const Filter: FC<Props> = ({
  callback,
  name,
  value,
  icon,
  placeholder,
  className,
  options = [],
  ...props
}) => {
 const handleChange = (newValue: SingleValue<Option>) => {
   callback(newValue?.value || '');
 };

  const selectedOption = options.find(option => option.value === value) || null;

  const Control = ({children, ...props}: ControlProps<Option, false>) => (
    <components.Control {...props}>
      {icon && <span className={styles.filter__icon}>{icon}</span>}
      {children}
    </components.Control>
  );

  return (
    // <div className={cn(styles.filter__container, className)}>
    <Select<Option>
      className={cn(className, styles.filter__select, 'smoothTransition')}
      classNamePrefix='select'
      value={selectedOption}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      name={name}
      isSearchable={false}
      components={{
        Control,
        IndicatorSeparator: () => null,
      }}
      styles={colourStyles}
      {...props}
    />
    // </div>
  );
};
