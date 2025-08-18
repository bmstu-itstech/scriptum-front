import type { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  variant: 'success' | 'error' | 'warning';
  title: string;
  description: string;
  duration?: number;
  onClose: () => void;
}
