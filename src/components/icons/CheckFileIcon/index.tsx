import { useState } from 'react';
import type { FC } from 'react';
import classNames from 'classnames';
import styles from './CheckFileIcon.module.css';
import { Props } from './CheckFileIcon.props';

export const CheckFileIcon: FC<Props> = ({ className, onClick }) => {
    const [checked, setChecked] = useState(false);
    const toggleChecked = () => setChecked(prev => !prev);
    const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
        onClick?.(e);
        toggleChecked();
    }
    return (
        <svg
            onClick={handleClick}
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={classNames(styles.icon, className)}
        >
            <rect
                x='2'
                y='2'
                width='16'
                height='16'
                rx='2'
                stroke='currentColor'
                strokeWidth='2'
                fill={checked ? 'currentColor' : 'none'}
            />
            {checked && (
                <path
                    d='M6 10L9 13L14 7'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            )}
        </svg>
    );
};
