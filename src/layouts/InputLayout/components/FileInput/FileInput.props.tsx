import type { HTMLAttributes } from 'react';

export interface FileProps extends HTMLAttributes<HTMLInputElement> {
  type: string;
  errorText: string | null;
  name: string;
  inputClassName?: string;
  inputTitle?: string;
  placeholder?: string;
  isRequired?: boolean;
}
