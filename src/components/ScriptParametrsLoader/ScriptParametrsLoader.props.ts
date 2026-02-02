import type { ParameterWithId } from '@/app/(withHeader)/script/create/page.usecase';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  params: ParameterWithId[];
  type: 'input' | 'output';
}
