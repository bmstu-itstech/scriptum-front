import { FC } from "react";
import { Props } from "./AuthLayout.props";
import styles from './AuthLayout.module.css'
import cn from "classnames";

export const AuthLayout: FC<Props> = ({ head, center, tail, className, ...props }) => {
	return (
		<div className={cn(styles.authContainer, className)} {...props}>
			<div className={styles.head}>
				{head}
			</div>
			<div className={styles.center}>
				{center}
			</div>
			<div className={cn(styles.tail, className)}>
				{tail}
			</div>
		</div>
	);
}
