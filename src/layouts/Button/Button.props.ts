import type {HTMLAttributes, ReactElement} from 'react';

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  icon?: ReactElement;
  type?: 'button' | 'submit' | 'reset' | undefined;
}
