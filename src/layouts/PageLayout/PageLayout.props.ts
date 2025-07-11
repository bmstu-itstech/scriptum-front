import type { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement>{
    subtitle?: string;
    title?: string;
}