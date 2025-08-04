'use client';
import type Props from '@/components/Filter/Filter.props';
import {type FC} from 'react';
import cn from 'classnames';
import styles from '@/components/Filter/Filter.module.css';
import Select, {type SingleValue, type ActionMeta} from 'react-select';
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
  const handleChange = (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
    callback(newValue?.value || '');
  };

  const selectedOption = options.find(option => option.value === value) || null;

  return (
    <div className={cn(styles.filter__container, className)}>
      {icon && <span className={styles.filter__icon}>{icon}</span>}
      <Select<Option>
        className={cn(styles.filter__select, 'smoothTransition')}
        classNamePrefix='select'
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        name={name}
        isSearchable={false}
        components={{
          IndicatorSeparator: () => null,
        }}
        styles={colourStyles}
        {...props}
      />
    </div>
  );
};
