'use client';
import {FC, useCallback, useMemo, useState} from 'react';
import {Props} from './InputLayout.props';
import cn from 'classnames';
import styles from './InputLayout.module.css';
import {FileInput} from '@/layouts/InputLayout/components';

export const InputLayout: FC<Props> = ({
  defaultValue,
  onChange,
  toggleIcons,
  isPassword = false,
  isRequired = false,
  placeholder,
  errorText,
  inputTitle,
  type,
  inputClassName,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const currentIcon = isPassword ? (showPassword ? toggleIcons?.hide : toggleIcons?.show) : null;

  const TextInput = useMemo(() => {
    return (
      <div className={cn(styles.inputContainer, className)} {...props}>
        {inputTitle && (
          <label htmlFor={inputTitle} className='layout__inputLabel'>
            {inputTitle}
          </label>
        )}

        <div className={cn(styles.inputBlock)}>
          <input
            defaultValue={defaultValue}
            id={inputTitle}
            name={inputTitle}
            onChange={onChange}
            required={isRequired}
            type={isPassword && !showPassword ? 'password' : 'text'}
            placeholder={placeholder}
            className={cn(styles.input, 'smoothTransition', inputClassName)}
          />
          {isPassword && currentIcon && (
            <button
              type='button'
              className={cn(styles.icon, 'smoothTransition')}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}>
              {currentIcon}
            </button>
          )}
        </div>
        {errorText && <span className={cn(styles.errorText)}>{errorText}</span>}
      </div>
    );
  }, []);

  return type == 'file' ? (
    <FileInput
      defaultValue={defaultValue}
      inputClassName={inputClassName}
      toggleIcons={toggleIcons}
      isPassword={false}
      isRequired={false}
      placeholder={placeholder}
      errorText={errorText}
      inputTitle={inputTitle}
      type={type}
      className={className}
    />
  ) : (
    TextInput
  );
};
