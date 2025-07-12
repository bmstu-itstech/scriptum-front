import { Link } from "@/shared/Link";
import { FC } from "react";
import { Props } from "./Center.props";
import { centerUsecase } from "./Center.usecase";

export const Center: FC<Props> = ({ className, ...props }) => {
	return (
		<nav className={className} {...props}>
			{centerUsecase.map((link, index) => (
				<Link
					key={index}
					icon={link.icon}
					title={link.title}
				/>
			))}
		</nav>
	);
};
