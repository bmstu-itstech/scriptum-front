import type { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  activePath : string;
}
