'use client';
import { FC, useState } from 'react';
import { Props } from './InputLayout.props';
import cn from 'classnames';
import styles from './InputLayout.module.css';

export const InputLayout: FC<Props> = ({
	toggleIcons,
	isPassword = false,
	isRequired = false,
	placeholder,
	errorText,
	className,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const currentIcon = isPassword
		? (showPassword ? toggleIcons?.hide : toggleIcons?.show)
		: null;

	return (
		<div className={cn(styles.inputContainer, className)} {...props}>
			<div className={cn(styles.inputBlock)}>
				<input
					required={isRequired}
					type={isPassword && !showPassword ? 'password' : 'text'}
					placeholder={placeholder}
					className={cn(styles.input, 'smoothTransition')}
				/>
				{isPassword && currentIcon && (
					<button
						type="button"
						className={cn(styles.icon, 'smoothTransition')}
						onClick={isPassword ? togglePasswordVisibility : undefined}
						aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
					>
						{currentIcon}
					</button>
				)}
			</div>
			<span className={cn(styles.errorText)}>{errorText}</span>
		</div>
	);
};
