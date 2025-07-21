'use client';
import { FC, useCallback, useState } from 'react';
import { Props } from './InputLayout.props';
import cn from 'classnames';
import styles from './InputLayout.module.css';

export const InputLayout: FC<Props> = ({
	value,
	onChange,
	toggleIcons,
	isPassword = false,
	isRequired = false,
	placeholder,
	errorText,
	className,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = useCallback(() => {
		setShowPassword(!showPassword);
	}, [showPassword]);

	const currentIcon = isPassword
		? (showPassword ? toggleIcons?.hide : toggleIcons?.show)
		: null;

	return (
		<div className={cn(styles.inputContainer, className)} {...props}>
			<div className={cn(styles.inputBlock)}>
				<input
					value={value}
					onChange={onChange}
					required={isRequired}
					type={isPassword && !showPassword ? 'password' : 'text'}
					placeholder={placeholder}
					className={cn(styles.input, 'smoothTransition')}
				/>
				{isPassword && currentIcon && (
					<button
						type="button"
						className={cn(styles.icon, 'smoothTransition')}
						onClick={togglePasswordVisibility}
						aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
					>
						{currentIcon}
					</button>
				)}
			</div>
			{errorText && <span className={cn(styles.errorText)}>{errorText}</span>}
		</div>
	);
};
