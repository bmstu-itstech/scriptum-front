import type {ReactElement} from 'react';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  // children: ReactElement[];
  type: 'input' | 'output';
}
