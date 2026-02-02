import type { ButtonHTMLAttributes, ReactElement } from 'react';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactElement;
  isLoading?: boolean;
}
