import { useRef, FC, memo, useCallback, useState, useMemo } from 'react';
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
import { CheckFileIcon } from '@/components/icons/CheckFileIcon';

const FileInput: FC<FileProps> = ({
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
  const [isDragActive, setIsDragActive] = useState(false);
  const files = values['file'] || [];
  const file_checked = values['file_checked'];

  const handleDeleteFile = useCallback(
    (index: number) => (e: React.MouseEvent<SVGSVGElement>) => {
      e.preventDefault();
      e.stopPropagation();
      files.splice(index, 1);
      setFieldValue('file', files.length ? files : []);
    },
    [values, setFieldValue],
  );

  const handleCheckFile = useCallback(
    (file: File) => (e: React.MouseEvent<SVGSVGElement>) => {
      setFieldValue('file_checked', file);
    
    },
    [setFieldValue]
  );

  const FileList = () => useMemo(() => {
    console.log('рендер списка файлов');
    return (
      <div className={styles.fileList} >
        {
          files.map((file, index) => {
            return (
              <div className={styles.fileComponent} key={index}>
                <PythonIcon className={styles.python} />
                <p className={styles.FileName}>{file.name}</p>
                <p className={styles.FileSize}>({(file.size / 1024).toFixed(2)} KB)</p>
                <CheckFileIcon isChecked={file.name === file_checked?.name} onClick={handleCheckFile(file)} className={styles.checkFile} />
                <CloseModalIcon onClick={handleDeleteFile(index)} className={styles.deleteFile} />
              </div>
            );
          })
        }
      </div >
    );
  }, [files, handleDeleteFile, handleCheckFile, file_checked]);

  const handleFileChange = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    setFieldValue('file', fileArray);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileChange(droppedFiles);
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
          [styles.dragActive]: isDragActive,
        })}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        {values['file']?.length ? (
          <FileList />
        ) : (
          <TextWithIcon icon={<UploadIcon />}>
            {placeholder || 'Перетащите файлы или кликните для выбора'}
          </TextWithIcon>
        )}

        <input
          id={name}
          tabIndex={-1}
          ref={inputRef}
          name={name}
          type='file'
          multiple
          accept='.py'
          className={cn(styles.fileInput, inputClassName)}
          onChange={(e) => {
            if (e.target.files) {
              handleFileChange(e.target.files);
            }
          }}
        />
      </label>

      {errorText && <span className={cn(stylesBase.errorText, styles.fileError)}>{errorText}</span>}
    </div>
  );
};

export default memo(FileInput);
