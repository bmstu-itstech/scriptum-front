import type { HTMLAttributes, ReactElement } from 'react';

export type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactElement[];
  contentClassname?: string;
  mainExtendedClassname?: string;
  innerContentClassname?: string;
  autoExpand?: boolean;
};
