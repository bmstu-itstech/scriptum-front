import type { ReactElement } from 'react';
import type { GroupBase, StylesConfig } from 'react-select';

interface Option {
  value: string;
  label: string;
}

export type FilterChangeValue = string | { target: { name: string; value: string } };

export type FilterBlurEvent = { target: { name: string } };

export default interface Props {
  index?: number;
  icon?: ReactElement;
  name: string;
  value: string;
  placeholder: string;
  onChange: (value: FilterChangeValue) => void;
  onBlur?: (e: FilterBlurEvent) => void;
  className?: string;
  selectClassName?: string;
  options: Option[];
  errorText?: string | null;
  isFormik?: boolean;
  style?: StylesConfig<Option, false, GroupBase<Option>>;
}
