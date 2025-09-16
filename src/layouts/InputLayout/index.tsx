'use client';
import { FC, memo, useCallback, useMemo, useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { Props } from './InputLayout.props';
import cn from 'classnames';
import styles from './InputLayout.module.css';
import FileInput from '@/layouts/InputLayout/components/FileInput';

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
    [isPassword, showPassword, toggleIcons?.hide, toggleIcons?.show],
  );

  const [localValue, setLocalValue] = useState(value ?? '');

  const [debouncedValue] = useDebounce(localValue, 200);

  useEffect(() => {
    if (value !== localValue) {
      if (value) {
        setLocalValue(value ?? '');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (onChange) {
      onChange(debouncedValue, name);
    }
  }, [debouncedValue, name, onChange]);

  const handleLocalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocalValue(e.target.value);
  };

  if (type === 'file') {
    return (
      <FileInput
        type={type}
        name={name}
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
            value={localValue}
            onChange={handleLocalChange}
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
            value={localValue}
            onChange={handleLocalChange}
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
