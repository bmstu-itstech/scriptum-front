'use client';
import type Props from '@/components/Filter/Filter.props';
import { useState, type FC, useCallback } from 'react';
import cn from 'classnames';
import styles from '@/components/Filter/Filter.module.css';

export const Filter: FC<Props> = ({
	callback,
	icon,
	placeholder,
	className,
	options = [],
	...props
}) => {
	const [value, setValue] = useState('');

	const onChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setValue(e.currentTarget.value);
		callback(e.currentTarget.value);
	}, [callback]);

	return (
		<div className={cn(styles.filter__container, className)}>
			{icon && <span className={styles.filter__icon}>{icon}</span>}
			<select
				value={value}
				onChange={onChange}
				className={cn(styles.filter__select, 'smoothTransition')}
				{...props}
			>
				{placeholder && (
					<option value="" disabled hidden>
						{placeholder}
					</option>
				)}
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};
