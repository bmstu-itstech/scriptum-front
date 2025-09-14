import type { HTMLAttributes } from 'react';

export interface Props extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
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
}
