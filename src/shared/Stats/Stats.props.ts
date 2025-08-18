import { HTMLAttributes } from 'react';

interface Stat {
  text: string;
  count: number;
  total?: number;
  unit?: string;
}

export interface Props extends HTMLAttributes<HTMLDivElement> {
  stats: Stat[];
  separator?: string | React.ReactNode;
}
