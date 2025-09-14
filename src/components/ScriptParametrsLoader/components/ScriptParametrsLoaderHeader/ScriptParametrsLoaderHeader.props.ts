import type { ParameterWithId } from '@/app/(withHeader)/script/create/page.usecase';
import type { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  params: ParameterWithId[];
  type: 'input' | 'output';
  push: <X = any>(obj: X) => void;
}
