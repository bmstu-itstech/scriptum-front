import { FC } from "react";
import cn from "classnames";
import styles from "@/shared/Link/Link.module.css";
import type { Props } from "@/shared/Link/Link.props";

export const Link: FC<Props> = ({ icon, title, className, ...props }) => {
	return (
		<a className={cn(styles.link, 'smoothTransition', className)} {...props}>
			<span className={cn(styles.icon)}>{icon}</span>
			<span className={cn(styles.title)}>{title}</span>
		</a>
	);
}
