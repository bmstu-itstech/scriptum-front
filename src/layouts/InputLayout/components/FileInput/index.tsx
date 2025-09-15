'use client';
import { useRef, FC, memo, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { useFormikContext } from 'formik';
import { type ScriptFormValues } from '@/app/(withHeader)/script/create/page.usecase';
import { FileProps } from './FileInput.props';
import styles from './FileInput.module.css';
import stylesBase from '../../InputLayout.module.css';
import { TextWithIcon } from '@/shared/TextWithIcon';
import { UploadIcon } from '@/components/icons/UploadIcon';
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
	const inputRef = useRef<HTMLInputElement>(null);
	const { values, setFieldValue } = useFormikContext<ScriptFormValues>();

	const [files, setFiles] = useState<File[]>(values.file || []);
	const [file_checked, setFileChecked] = useState<File | null>(values.file_checked || null);

	useEffect(() => {
		if (values.file !== files) {
			setFiles(values.file || []);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values.file]);

	useEffect(() => {
		if (values.file_checked !== file_checked) {
			setFileChecked(values.file_checked || null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values.file_checked]);

	const handleFileChange = (newFiles: FileList | File[]) => {
		if (newFiles.length === 0) return;

		const fileArray = Array.from(newFiles);
		setFiles(fileArray);
		setFieldValue('file', fileArray);
	};

	const handleDeleteFile = useCallback(
		(index: number) => (e: React.MouseEvent<SVGSVGElement>) => {
			e.preventDefault();
			e.stopPropagation();
			const updatedFiles = [...files];
			updatedFiles.splice(index, 1);
			setFiles(updatedFiles);
			setFieldValue('file', updatedFiles);
		},
		[files, setFieldValue],
	);

	const handleCheckFile = useCallback(
		(file: File) => (e: React.MouseEvent<SVGSVGElement>) => {
			e.preventDefault();
			e.stopPropagation();
			setFieldValue('file_checked', file);
		},
		[setFieldValue],
	);

	const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		e.stopPropagation();
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
				className={cn(styles.fileInput, { [styles.hasError]: errorText })}
				onDragEnter={handleDragEnter}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}>
				{files.length > 0 ? (
					<div className={styles.fileList}>
						{files.map((file, index) => (
							<div key={index} className={styles.fileComponent}>
								<PythonIcon className={styles.python} />
								<p className={styles.FileName}>{file.name}</p>
								<p className={styles.FileSize}>({(file.size / 1024).toFixed(2)} KB)</p>
								<CheckFileIcon
									isChecked={file.name === file_checked?.name}
									onClick={handleCheckFile(file)}
									className={styles.checkFile}
								/>
								<CloseModalIcon onClick={handleDeleteFile(index)} className={styles.deleteFile} />
							</div>
						))}
					</div>
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
