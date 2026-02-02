import type { HTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

type BaseProps = Omit<HTMLAttributes<HTMLElement>, 'onChange' | 'autoComplete'>;

export interface Props extends BaseProps {
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
