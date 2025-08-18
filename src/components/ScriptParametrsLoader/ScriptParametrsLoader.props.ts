import type { ParameterWithId } from '@/app/(withHeader)/script/create/page.usecase';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  // children: ReactElement[];
  params: ParameterWithId[];
  type: 'input' | 'output';
}
