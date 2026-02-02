import type { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  isEmpty: boolean;
  type: 'input' | 'output';
}
