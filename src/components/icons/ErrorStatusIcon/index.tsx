import type { FC } from 'react';
import { Props } from './ErrorStatusIcon.props'

export const ErrorStatusIcon: FC<Props> = ({ className, ...props }) => {
	return (
		<svg 
			width="16" 
			height="16" 
			viewBox="0 0 16 16" 
			fill="none" 
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			{...props}
		>
			<g clip-path="url(#clip0_425_377)">
				<path 
					d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 7.99999C14.6668 4.3181 11.6821 1.33333 8.00016 1.33333C4.31826 1.33333 1.3335 4.3181 1.3335 7.99999C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z" 
					stroke="currentColor" 
					stroke-width="2" 
					stroke-linecap="round" 
					stroke-linejoin="round"
				/>
				<path 
					d="M10 6L6 10" 
					stroke="currentColor" 
					stroke-width="2" 
					stroke-linecap="round" 
					stroke-linejoin="round"
				/>
				<path 
					d="M6 6L10 10" 
					stroke="currentColor" 
					stroke-width="2" 
					stroke-linecap="round" 
					stroke-linejoin="round"
				/>
			</g>
			<defs>
				<clipPath id="clip0_425_377">
				<rect width="16" height="16" fill="white"/>
				</clipPath>
			</defs>
		</svg>
	);
};