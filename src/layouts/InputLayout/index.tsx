// InputLayout.tsx
'use client';
import { FC, memo, useCallback, useMemo, useState, type ChangeEventHandler } from 'react';
import { Props } from './InputLayout.props';
import cn from 'classnames';
import styles from './InputLayout.module.css';
import FileInput from '@/layouts/InputLayout/components';
import { ErrorMessage } from 'formik';

const InputLayout: FC<Props> = ({
  onChange,
  name,
  toggleIcons,
  isPassword = false,
  isRequired = false,
  placeholder,
  errorText = null,
  inputTitle,
  isTextArea = false,
  inputLabelClassName,
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

  const currentIcon = useMemo(
    () => (isPassword ? (showPassword ? toggleIcons?.hide : toggleIcons?.show) : null),
    [isPassword, showPassword],
  );

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
        <label htmlFor={name} className={cn('layout__inputLabel', inputLabelClassName)}>
          {inputTitle}
        </label>
      )}

      <div className={cn(styles.inputBlock)}>
        {isTextArea ? (
          <textarea
            id={name}
            name={name}
            value={type === 'file' ? undefined : value}
            onChange={onChange as ChangeEventHandler<HTMLTextAreaElement> | undefined}
            required={isRequired}
            placeholder={placeholder}
            className={cn(styles.input, 'smoothTransition', inputClassName, {
              [styles.errorInput]: errorText,
            })}
          />
        ) : (
          <input
            id={name}
            name={name}
            value={type === 'file' ? undefined : value}
            onChange={onChange}
            required={isRequired}
            type={isPassword && !showPassword ? 'password' : 'text'}
            placeholder={placeholder}
            className={cn(styles.input, 'smoothTransition', inputClassName, {
              [styles.errorInput]: errorText,
            })}
          />
        )}

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
};

export default memo(InputLayout);
