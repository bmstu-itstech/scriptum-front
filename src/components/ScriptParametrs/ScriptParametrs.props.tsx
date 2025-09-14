import { IScriptStruct } from '@/layouts/ScriptParametrsLayout/ScriptParametrsLayout.props';
import type { HTMLAttributes, ReactElement } from 'react';

export interface Props extends IScriptStruct, HTMLAttributes<HTMLDivElement> {
  children: ReactElement[];
  contentClassname?: string;
  innerContentClassname?: string;
}
