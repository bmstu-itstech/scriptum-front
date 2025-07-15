import type { FC } from 'react';
import { Props } from '@/components/icons/WarningIcon/WarningIcon.props';

export const WarningIcon: FC<Props> = ({ className, ...props }) => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			{...props}
		>
			<path d="M12 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M12 17H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M3 20.5L12 4L21 20.5H3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
		</svg>

	);
};
