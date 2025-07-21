import { FC } from "react";
import cn from 'classnames';
import styles from './PopupLayout.module.css';
import { Props } from "./PopupLayout.props";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { SuccessIcon } from "@/components/icons/SuccessIcon";
import { ErrorIcon } from "@/components/icons/ErrorIcon";
import { WarningIcon } from "@/components/icons/WarningIcon";

export const PopupLayout: FC<Props> = ({
	variant = 'success',
	title,
	description,
	className,
	...props
}) => {
	const getVariantIcon = () => {
		switch (variant) {
			case 'success':
				return <SuccessIcon className={styles.icon} />;
			case 'error':
				return <ErrorIcon className={styles.icon} />;
			case 'warning':
				return <WarningIcon className={styles.icon} />;
			default:
				return <SuccessIcon className={styles.icon} />;
		}
	};

	return (
		<div
			className={cn(
				styles.alert,
				{
					[styles.success]: variant === 'success',
					[styles.error]: variant === 'error',
					[styles.warning]: variant === 'warning',
				},
				className
			)}
			{...props}
		>
			<div className={styles.alertContainer}>
				<div className={styles.iconContainer}>
					{getVariantIcon()}
				</div>

				<div className={styles.content}>
					<h3 className={styles.title}>{title}</h3>
					<p className={styles.description}>{description}</p>
				</div>

				<button
					className={styles.closeButton}
					aria-label="Close alert"
				>
					<CloseIcon className={styles.closeIcon} />
				</button>
			</div>
		</div>
	);
};
