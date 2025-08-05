// InputLayout.tsx
'use client';
import { FC, useCallback, useState, type ChangeEventHandler } from 'react';
import { Props } from './InputLayout.props';
import cn from 'classnames';
import styles from './InputLayout.module.css';
import { FileInput } from '@/layouts/InputLayout/components';

export const InputLayout: FC<Props> = ({
  onChange,
  name,
  toggleIcons,
  isPassword = false,
  isRequired = false,
  placeholder,
  errorText,
  inputTitle,
  isTextArea = false,
  type,
  value,
  inputClassName,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const currentIcon = isPassword ? (showPassword ? toggleIcons?.hide : toggleIcons?.show) : null;

  if (type === 'file') {
    return (
      <FileInput
        type={type}
        name={name}
        onChange={onChange}
        inputClassName={inputClassName}
        errorText={errorText}
        inputTitle={inputTitle}
        placeholder={placeholder}
        className={className}
      />
    );
  }

  return (
    <div className={cn(styles.inputContainer, className)} {...props}>
      {inputTitle && (
        <label htmlFor={name} className='layout__inputLabel'>
          {inputTitle}
        </label>
      )}

      <div className={cn(styles.inputBlock)}>
        {isTextArea ? <textarea
          id={name}
          name={name}
          value={type === 'file' ? undefined : value}
          onChange={onChange as ChangeEventHandler<HTMLTextAreaElement> | undefined}
          required={isRequired}
          placeholder={placeholder}
          className={cn(styles.input, 'smoothTransition', inputClassName)}
        /> : <input
          id={name}
          name={name}
          value={type === 'file' ? undefined : value}
          onChange={onChange}
          required={isRequired}
          type={isPassword && !showPassword ? 'password' : type}
          placeholder={placeholder}
          className={cn(styles.input, 'smoothTransition', inputClassName)}
        />}

        {isPassword && currentIcon && (
          <button
            type='button'
            className={cn(styles.icon, 'smoothTransition')}
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
          >
            {currentIcon}
          </button>
        )}
      </div>
      {errorText && <span className={cn(styles.errorText)}>{errorText}</span>}
    </div>
  );
};