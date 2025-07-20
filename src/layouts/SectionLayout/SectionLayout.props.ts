import { HTMLAttributes } from "react";

export interface Props extends HTMLAttributes<HTMLDivElement> {
	title: string;
	subtitle: string;
}
