import { FC } from 'react';
import src from '@/assets/icons/shieldIcon.svg';
import { Props } from './ShieldIcon.props';

export const ShieldIcon: FC<Props> = ({ className, ...props }) => {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			{...props}
		>
			<path
				d="M16.6663 10.8334C16.6663 15 13.7497 17.0834 10.283 18.2917C10.1015 18.3532 9.90429 18.3503 9.72467 18.2834C6.24967 17.0834 3.33301 15 3.33301 10.8334V5.00003C3.33301 4.77902 3.42081 4.56705 3.57709 4.41077C3.73337 4.25449 3.94533 4.1667 4.16634 4.1667C5.83301 4.1667 7.91634 3.1667 9.36634 1.90003C9.54289 1.74919 9.76747 1.66632 9.99967 1.66632C10.2319 1.66632 10.4565 1.74919 10.633 1.90003C12.0913 3.17503 14.1663 4.1667 15.833 4.1667C16.054 4.1667 16.266 4.25449 16.4223 4.41077C16.5785 4.56705 16.6663 4.77902 16.6663 5.00003V10.8334Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
