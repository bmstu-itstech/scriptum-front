'use client'
import React, { FC, useCallback, useEffect, useState } from 'react';
import Props from './PipelineModalLayout.props';
import style from './PipelineModalLayout.module.css';
import cn from 'classnames';
import { PipelineStatus, OUTPUT_FILENAME, INPUT_FILENAME } from '@/shared/consts/pipeline';
import { PipelineButton } from '@/shared/PipelineButton';
import { CloseModalIcon } from '@/components/icons/CloseModalIcon';
import { CopyTxtIcon } from '@/components/icons/CopyTxtIcon';
import { ExportTxtIcon } from '@/components/icons/ExportTxtIcon';
import ReactDOM from 'react-dom';

const getResultTitle = (status: PipelineStatus) => {
	switch (status) {
		case PipelineStatus.OK:
		case PipelineStatus.RUNNING:
			return 'Результат выполнения';
		case PipelineStatus.ERROR:
			return 'Ошибка';
	}
};

export const PipelineModalLayout: FC<Props> = ({
	isOpen,
	onClose,
	status,
	scriptNumber,
	scriptName,
	className,
	timeStart,
	duration,
	input,
	output,
	...props
}) => {
	const [showInputTooltip, setShowInputTooltip] = useState(false);
	const [showOutputTooltip, setShowOutputTooltip] = useState(false);

	const button = <PipelineButton status={status} />;
	const resultTitle = getResultTitle(status);
	const isError = status === PipelineStatus.ERROR;

	const handleCopy = useCallback(async (text: string, type: 'input' | 'output') => {
		try {
			await navigator.clipboard.writeText(text);
			if (type === 'input') {
				setShowInputTooltip(true);
				setTimeout(() => setShowInputTooltip(false), 2000);
			} else {
				setShowOutputTooltip(true);
				setTimeout(() => setShowOutputTooltip(false), 2000);
			}
		} catch (err) {
			// console.error('Ошибка при копировании: ', err);
		}
	}, []);

	const handleDownload = useCallback((text: string, filename: string) => {
		const blob = new Blob([text], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}, []);

	const handleKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			onClose();
		}
	}, [onClose]);

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown);
		}
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, handleKeyDown]);

	if (!isOpen) return null;

	return ReactDOM.createPortal((
		<div className={cn(style.modal, className)} {...props}>
			<div className={style.overlay} onClick={onClose}></div>
			<div className={style.modalContent}>
				<button className={style.closeButton} onClick={onClose}>
					<CloseModalIcon />
				</button>

				<h1 className={style.header}>
					<div className={style.buttonWrapper}>
						{button}
					</div>
					<div className={style.titleWrapper}>
						<h3 className={style.scriptNumber}>{scriptNumber}</h3>
						<p className={style.scriptName}>{scriptName}</p>
					</div>
				</h1>

				<div className={style.content}>
					<div className={style.timing}>
						<div className={style.timeBlock}>
							<p className={style.timeLabel}>Время запуска</p>
							<p className={style.timeValue}>{timeStart}</p>
						</div>
						<div className={style.timeBlock}>
							<p className={style.timeLabel}>Длительность</p>
							<p className={style.timeValue}>{duration}</p>
						</div>
					</div>

					<div className={style.section}>
						<div className={style.sectionHeader}>
							<p className={style.sectionTitle}>Параметры запуска</p>
							<div className={style.actionButtons}>
								<button
									className={style.actionButton}
									onClick={() => handleDownload(input, INPUT_FILENAME)}
								>
									<ExportTxtIcon />
									<span>Скачать</span>
								</button>
								<div className={style.tooltipContainer}>
									<button
										className={style.actionButton}
										onClick={() => handleCopy(input, 'input')}
									>
										<CopyTxtIcon />
										<span>Копировать</span>
									</button>
									{showInputTooltip && (
										<span className={style.tooltip}>Скопировано!</span>
									)}
								</div>
							</div>
						</div>
						<pre className={style.codeBlock}>{input}</pre>
					</div>

					<div className={cn(style.section, { [style.errorSection]: isError })}>
						<div className={style.sectionHeader}>
							<p className={cn(style.sectionTitle, { [style.errorTitle]: isError })}>
								{resultTitle}
							</p>
							<div className={style.actionButtons}>
								<button
									className={style.actionButton}
									onClick={() => handleDownload(output, OUTPUT_FILENAME)}
								>
									<ExportTxtIcon />
									<span>Скачать</span>
								</button>
								<div className={style.tooltipContainer}>
									<button
										className={style.actionButton}
										onClick={() => handleCopy(output, 'output')}
									>
										<CopyTxtIcon />
										<span>Копировать</span>
									</button>
									{showOutputTooltip && (
										<span className={style.tooltip}>Скопировано!</span>
									)}
								</div>
							</div>
						</div>
						<pre className={cn(style.codeBlock, { [style.errorCode]: isError })}>
							{output}
						</pre>
					</div>
				</div>
			</div>

		</div>
	), document.body);
}
