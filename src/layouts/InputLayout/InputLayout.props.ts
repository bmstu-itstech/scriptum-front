import type {HTMLAttributes, HTMLInputTypeAttribute} from 'react';

export interface Props extends HTMLAttributes<HTMLInputElement> {
  toggleIcons?: {
    show: React.ReactNode;
    hide: React.ReactNode;
  };
  type: string;
  errorText?: string | null;
  value: string;
  name: string;
  inputClassName?: string;
  inputTitle?: string;
  isPassword?: boolean;
  placeholder?: string;
  isRequired?: boolean;
  isTextArea?: boolean;
}

export interface FileProps extends HTMLAttributes<HTMLInputElement> {
  type: string;
  errorText: string | null;
  name: string;
  inputClassName?: string;
  inputTitle?: string;
  placeholder?: string;
  isRequired?: boolean;
}
