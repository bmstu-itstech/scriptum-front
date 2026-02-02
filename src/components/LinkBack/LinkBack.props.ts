import type { HTMLAttributes, ReactElement } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: ReactElement;
}
