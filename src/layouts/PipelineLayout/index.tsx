'use client'
import { FC, useState } from 'react';
import Props from './PipelineLayout.props';
import style from './PipelineLayout.module.css';
import cn from 'classnames';
import { PipelineButton } from '@/shared/PipelineButton';
import { PipelineModalLayout } from '../PipelineModalLayout';

export const PipelineLayout: FC<Props> = ({
	status,
	scriptNumber,
	scriptName,
	timeStart,
	duration,
	input,
	output,
	className,
	...props
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const statusButton = <PipelineButton status={status} />;

	return (
		<>
			<div
				className={cn(style.pipeline, className)}
				onClick={() => setIsOpen(true)}
				{...props}
			>
				<div className={cn(style.dataSection, style.number)}>
					<p className={style.title}>ID</p>
					<p className={style.content}>{scriptNumber}</p>
				</div>
				<div className={cn(style.dataSection, style.name)}>
					<p className={style.title}>Скрипт</p>
					<p className={style.content}>{scriptName}</p>
				</div>
				<div className={style.timeBlock}>
					<div className={cn(style.dataSection, style.time)}>
						<p className={style.title}>Время запуска</p>
						<p className={style.content}>{timeStart}</p>
					</div>

					<div className={cn(style.dataSection, style.time)}>
						<p className={style.title}>Длительность</p>
						<p className={style.content}>{duration}</p>
					</div>
				</div>
				<div className={style.buttonSection}>
					{statusButton}
				</div>
			</div>

			<PipelineModalLayout isOpen={isOpen} onClose={() => setIsOpen(false)}
				status={status}
				scriptNumber={scriptNumber}
				scriptName={scriptName}
				timeStart={timeStart}
				duration={duration}
				input={input}
				output={output}
			/>
		</>
	);
}
