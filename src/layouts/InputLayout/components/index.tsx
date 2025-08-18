import { useRef, FC, memo, useState, useMemo, useCallback } from 'react';
import cn from 'classnames';
import { TextWithIcon } from '@/shared/TextWithIcon';
import { UploadIcon } from '@/components/icons/UploadIcon';
import type { FileProps } from '@/layouts/InputLayout/InputLayout.props';
import styles from '@/layouts/InputLayout/components/FileInput.module.css';
import stylesBase from '@/layouts/InputLayout/InputLayout.module.css';
import { useFormikContext } from 'formik';
import { type ScriptFormValues } from '@/app/(withHeader)/script/create/page.usecase';
import { CloseModalIcon } from '@/components/icons/CloseModalIcon';
import { PythonIcon } from '@/components/icons/AttentionIcon copy';

const FileInput: FC<FileProps> = ({
  onChange,
  name,
  placeholder,
  errorText,
  inputTitle,
  inputClassName,
  className,
  ...props
}) => {
  const { values, setFieldValue } = useFormikContext<ScriptFormValues>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDeleteFile = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      setFieldValue(name, null);
    },
    [name, setFieldValue],
  );

  const FileComponent = () => {
    return (
      <div className={styles.fileComponent}>
        <PythonIcon className={styles.python} />
        <p className={styles.FileName}>{values.file?.name}</p>
        {values.file?.size && (
          <p className={styles.FileSize}> ({(values.file.size / 1024).toFixed(2)} KB)</p>
        )}
        <CloseModalIcon onClick={handleDeleteFile} className={styles.deleteFile} />
      </div>
    );
  };
  const handleDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const handleFileChange = (file: File) => {
    if (inputRef.current) {
      const event = {
        target: {
          name: name,
          files: [file],
          value: file.name,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      onChange?.(event);
    }
  };

  return (
    <div className={cn(stylesBase.inputContainer, className)} {...props}>
      {inputTitle && <p className='layout__inputLabel'>{inputTitle}</p>}

      <label
        htmlFor={name}
        tabIndex={0}
        className={cn(styles.fileInput, {
          [styles.hasError]: errorText,
        })}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDrop={handleDrop}>
        {values.file ? (
          <FileComponent />
        ) : (
          <TextWithIcon icon={<UploadIcon />}>
            {placeholder || 'Перетащите файл или кликните для выбора'}
          </TextWithIcon>
        )}

        <input
          id={name}
          tabIndex={-1}
          ref={inputRef}
          name={name}
          type='file'
          accept='.py'
          className={styles.fileInput}
          onChange={onChange}
        />
      </label>

      {errorText && <span className={cn(stylesBase.errorText, styles.fileError)}>{errorText}</span>}
    </div>
  );
};

export default memo(FileInput);
