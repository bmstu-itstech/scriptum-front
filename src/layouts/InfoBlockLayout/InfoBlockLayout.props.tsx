import type { HTMLAttributes, ReactElement } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  header: ReactElement;
  children: ReactElement[];
  headerClassname?: string;
  contentClassname?: string;
}
