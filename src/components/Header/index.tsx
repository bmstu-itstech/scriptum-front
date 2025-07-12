import { FC } from "react";
import { HeaderLayout } from "@/layouts/HeaderLayout";
import { Props } from "./Header.props";
import { headUsecase, centerUsecase, tailUsecase } from "./Header.usecase";

export const Header: FC<Props> = ({ className, ...props }) => {
	return (
		<HeaderLayout
			head={headUsecase()}
			center={centerUsecase()}
			tail={tailUsecase()}
			className={className}
			{...props} />
	);
}
