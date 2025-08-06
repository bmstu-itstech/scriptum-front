import type { HTMLAttributes, ReactElement } from 'react';
import type { GroupBase, StylesConfig } from 'react-select';

interface Option {
  value: string;
  label: string;
}

export default interface Props {
  icon?: ReactElement;
  name: string;
  value: string;
  placeholder: string;
  callback: (value: string) => void;
  className?: string;
  selectClassName?: string;
  options: Option[];
  errorText?: string | null;
  style?: StylesConfig<Option, false, GroupBase<Option>>;
}
