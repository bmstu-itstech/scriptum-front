'use client';
import { useRef, FC, memo, useEffect, useState } from 'react';
import cn from 'classnames';
import { useFormikContext } from 'formik';
import { type ScriptFormValues } from '@/app/(withHeader)/script/create/page.usecase';
import { FileProps } from './FileInput.props';
import styles from './FileInput.module.css';
import stylesBase from '../../InputLayout.module.css';
import { TextWithIcon } from '@/shared/TextWithIcon';
import { UploadIcon } from '@/components/icons/UploadIcon';
import { CloseModalIcon } from '@/components/icons/CloseModalIcon';
import { TarFileIcon } from '@/components/icons/TarFileIcon';
import { useCustomToast } from '@/hooks/other/useCustomToast';

const FileInput: FC<FileProps> = ({
  name,
  placeholder,
  errorText,
  inputTitle,
  inputClassName,
  className,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { values, setFieldValue } = useFormikContext<ScriptFormValues>();
  const notify = useCustomToast();

  const [file, setFile] = useState<File | null>(values.file || null);
  const [isDragActive, setIsDragActive] = useState(false);

  useEffect(() => {
    if (values.file !== file) {
      setFile(values.file || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.file]);

  const isTarFile = (selectedFile: File) => {
    const name = selectedFile.name.toLowerCase();
    const type = selectedFile.type;

    const isByExtension =
      name.endsWith('.tar') || name.endsWith('.tar.gz') || name.endsWith('.tgz');

    const isByMimeType =
      type === 'application/x-tar' || type === 'application/gzip' || type === 'application/x-gzip';

    return isByExtension || isByMimeType;
  };

  const handleFileChange = (selectedFile: File | null) => {
    if (!selectedFile) {
      setFile(null);
      setFieldValue('file', null);
      return;
    }

    if (!isTarFile(selectedFile)) {
      notify('Неверный формат файла. Загрузите архив в формате .tar или .tar.gz', 'error');
      return;
    }

    setFile(selectedFile);
    setFieldValue('file', selectedFile);
  };

  const handleDeleteFile = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setFile(null);
    setFieldValue('file', null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    if (file) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    if (file) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    if (file) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    if (file) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileChange(droppedFiles[0]);
      setIsDragActive(false);
    }
  };

  return (
    <div className={cn(stylesBase.inputContainer, className)} {...props}>
      {inputTitle && <p className='layout__inputLabel'>{inputTitle}</p>}

      <label
        htmlFor={name}
        tabIndex={file ? -1 : 0}
        className={cn(styles.fileInput, {
          [styles.hasError]: errorText,
          [styles.dragActive]: isDragActive,
          [styles.fileLoaded]: file,
        })}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        {file ? (
          <div className={styles.fileList}>
            <div className={styles.fileComponent}>
              <TarFileIcon className={styles.python} />
              <p className={styles.FileName}>{file.name}</p>
              <p className={styles.FileSize}>({(file.size / 1024).toFixed(2)} KB)</p>
              <CloseModalIcon onClick={handleDeleteFile} className={styles.deleteFile} />
            </div>
            <p className={styles.fileLoadedHint}>Удалите файл для загрузки нового</p>
          </div>
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
          accept='.tar,.tar.gz,.tgz'
          disabled={!!file}
          className={cn(styles.fileInput, inputClassName)}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFileChange(e.target.files[0]);
            }
          }}
        />
      </label>

      {errorText && <span className={cn(stylesBase.errorText)}>{errorText}</span>}

      <p className={styles.dockerfileHint}>Dockerfile должен содержаться в корне архива</p>
    </div>
  );
};

export default memo(FileInput);
