'use client';
import { FC, useState } from 'react';
import { Props } from './FileInputLayout.props';
import cn from 'classnames';
import styles from './FileInputLayout.module.css';

export const FileInputLayout: FC<Props> = ({
  icon,
  isRequired = false,
  placeholder,
  errorText,
  className,
  ...props
}) => {
  const [isValidFile, setIsValidFile] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setIsValidFile(false);
      setFileName('');
      return;
    }

    const isPythonFile = file.name.endsWith('.py');

    if (!isPythonFile) {
      setIsValidFile(false);
      setFileName('');
      alert('Пожалуйста, загрузите файл с расширением .py');
      return;
    }

    setIsValidFile(true);
    setFileName(file.name);
  };

  return (
    <div className={cn(styles.inputContainer, isValidFile && styles.successLoad, className)}>
      <label className={styles.inputBlock}>
        <input
          accept='.py'
          required={isRequired}
          type='file'
          className={styles.visuallyHidden}
          onChange={handleFileChange}
          {...props}
        />
        <div className={cn(styles.inputContent, 'smoothTransition')}>
          {icon && <span className={cn(styles.icon)}>{icon}</span>}
          <span className={styles.placeholder}>{isValidFile ? fileName : placeholder}</span>
        </div>
      </label>
      {errorText && <span className={styles.errorText}>{errorText}</span>}
    </div>
  );
};
