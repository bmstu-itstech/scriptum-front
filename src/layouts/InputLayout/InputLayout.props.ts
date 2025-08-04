import type {HTMLAttributes, HTMLInputTypeAttribute} from 'react';

export interface Props extends HTMLAttributes<HTMLInputElement> {
  toggleIcons?: {
    show: React.ReactNode;
    hide: React.ReactNode;
  };
  type: string;
  errorText: string;
  inputClassName?: string;
  inputTitle?: string;
  isPassword?: boolean;
  placeholder?: string;
  isRequired?: boolean;
}
