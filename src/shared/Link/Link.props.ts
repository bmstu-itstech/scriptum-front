import { HTMLAttributes, ReactElement } from "react";

export interface Props extends HTMLAttributes<HTMLAnchorElement> {
	icon: ReactElement;
	title: string;
}
