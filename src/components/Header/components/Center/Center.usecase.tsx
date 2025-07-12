import { Props as LinkProps } from "@/shared/Link/Link.props";
import { HomeIcon } from "../../../icons/HomeIcon";
import { TaskIcon } from "../../../icons/TaskIcon";
import { LoadIcon } from "../../../icons/LoadIcon";

export const centerUsecase: LinkProps[] = [
	{
		icon: <HomeIcon width={16} height={16} />,
		title: "Главная",
	},
	{
		icon: <TaskIcon width={16} height={16} />,
		title: "Задачи",
	},
	{
		icon: <LoadIcon width={16} height={16} />,
		title: "Загрузка скрипта",
	},
];
