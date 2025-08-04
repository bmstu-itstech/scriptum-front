import {useMemo, useRef, useState, FC, useEffect} from 'react';
import cn from 'classnames';
import {TextWithIcon} from '@/shared/TextWithIcon';
import {UploadIcon} from '@/components/icons/UploadIcon';
import type {Props} from '@/layouts/InputLayout/InputLayout.props';
import styles from '@/layouts/InputLayout/components/FileInput.module.css';
import stylesBase from '@/layouts/InputLayout/InputLayout.module.css';

export const FileInput: FC<Props> = ({
  defaultValue,
  onChange,
  toggleIcons,
  isPassword = false,
  isRequired = false,
  placeholder,
  errorText,
  inputTitle,
  inputClassName,
  type,
  className,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File>();
  const handleDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };
  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };
  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    // alert(files[0].name);
    if (files.length == 1) {
      setFile(files[0]);
    }
    alert(file);
  };

  return (
    <div className={cn(stylesBase.inputContainer, className)} {...props}>
      <p className='layout__inputLabel'>{inputTitle}</p>
      <label
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        htmlFor={inputTitle}
        className={cn('layout__inputLabel', styles.fileInput)} // Add hover class
      >
        <TextWithIcon icon={<UploadIcon />}>{placeholder}</TextWithIcon>
        <input
          id={inputTitle}
          ref={inputRef}
          type='file'
          placeholder={placeholder}
          className={styles.fileInput__text}
          onChange={e => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
      </label>
      {/* {errorText && <span className={cn(styles.errorText)}>{errorText}</span>} */}
    </div>
  );
};
