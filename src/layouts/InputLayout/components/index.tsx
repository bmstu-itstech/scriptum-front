import { useRef, FC, memo } from 'react';
import cn from 'classnames';
import { TextWithIcon } from '@/shared/TextWithIcon';
import { UploadIcon } from '@/components/icons/UploadIcon';
import type { FileProps } from '@/layouts/InputLayout/InputLayout.props';
import styles from '@/layouts/InputLayout/components/FileInput.module.css';
import stylesBase from '@/layouts/InputLayout/InputLayout.module.css';

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
  const inputRef = useRef<HTMLInputElement>(null);

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
      // Создаем fake event для совместимости с Formik
      const event = {
        target: {
          name: name,
          files: [file],
          value: file.name
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      onChange?.(event);
    }
  };

  return (
    <div className={cn(stylesBase.inputContainer, className)} {...props}>
      {inputTitle && (
        <p className='layout__inputLabel'>{inputTitle}</p>
      )}

      <label
        htmlFor={name}
        className={cn(styles.fileInput, {
          [styles.hasError]: errorText
        })}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <TextWithIcon icon={<UploadIcon />}>
          {placeholder || 'Перетащите файл или кликните для выбора'}
        </TextWithIcon>

        <input
          id={name}
          ref={inputRef}
          name={name}
          type="file"
          accept=".py"
          className={styles.fileInput}
          onChange={onChange}
        />
      </label>

      {errorText && (
        <span className={cn(stylesBase.errorText, styles.fileError)}>
          {errorText}
        </span>
      )}
    </div>
  );
};

export default memo(FileInput)