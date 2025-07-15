import { FC } from "react";
import { Props } from "./Auth.props";
import cn from "classnames";
import { AuthLayout } from "@/layouts/AuthLayout";
import { authUsecase } from "./Auth.usecase";

export const Auth: FC<Props> = ({ className, ...props }) => {
	return <AuthLayout
		head={authUsecase.head}
		center={authUsecase.center}
		tail={authUsecase.tail}
		className={cn(className)}
		{...props}
	/>
}
