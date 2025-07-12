'use client';
import type Props from '@/components/Search/Search.props';
import {useState, type FC, useCallback} from 'react';
import cn from 'classnames';
import styles from '@/components/Search/Search.module.css';
// import debounce from 'lodash.debounce';

export const Search: FC<Props> = ({callback, icon, placeholder, className, ...props}) => {
  const [value, setValue] = useState('');

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    callback();
  }, []);

  return (
    <div className={cn(styles.search__container, className)}>
      {icon && <span className={styles.search__icon}>{icon}</span>}
      <input
        type='text'
        name='search'
        onChange={onChange}
        placeholder={placeholder}
        className={styles.search__input}
        value={value}
        {...props}
      />
    </div>
  );
};
