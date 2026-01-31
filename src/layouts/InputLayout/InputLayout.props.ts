import type { InputHTMLAttributes } from 'react';

export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'autoComplete'> {
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
  onChange?: (value: string, name?: string) => void;
  inputLabelClassName?: string;
  autoComplete?: string;
}
