import type { HTMLAttributes, ReactElement } from 'react';

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  icon?: ReactElement;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
}
