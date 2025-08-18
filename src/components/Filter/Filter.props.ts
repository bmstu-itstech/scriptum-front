import type { HTMLAttributes, ReactElement } from 'react';
import type { GroupBase, StylesConfig } from 'react-select';

interface Option {
  value: string;
  label: string;
}

export default interface Props {
  index?: number;
  icon?: ReactElement;
  name: string;
  value: string;
  placeholder: string;
  onChange: (value: any) => void;
  onBlur?: (e: any) => void;
  className?: string;
  selectClassName?: string;
  options: Option[];
  errorText?: string | null;
  isFormik?: boolean;
  style?: StylesConfig<Option, false, GroupBase<Option>>;
}
