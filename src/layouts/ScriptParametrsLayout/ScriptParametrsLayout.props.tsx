import type { HTMLAttributes, ReactElement } from 'react';

export interface IScriptStruct {
  header: ReactElement;
}

export interface Props extends IScriptStruct, HTMLAttributes<HTMLDivElement> {
  children: ReactElement | ReactElement[];
  headerClassname?: string;
}
