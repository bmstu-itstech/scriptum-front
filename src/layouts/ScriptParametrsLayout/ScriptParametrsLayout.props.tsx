import type { IScriptItem } from '@/components/ScriptsPanel/components/ScriptElement/ScriptElement.props';
import type { HTMLAttributes, JSX, ReactElement } from 'react';

interface IInputData {
  title: string;
  translate: string;
  type: string;
  measure: string;
}

interface IOutputData {
  title: string;
  translate: string;
  type: string;
  measure: string;
}

export default interface IScript extends IScriptItem, HTMLAttributes<HTMLDivElement> {
  params: {
    input: IInputData[];
    output: IOutputData[];
  };
}

export interface IScriptStruct {
  header: ReactElement;
}

export interface Props extends IScriptStruct, HTMLAttributes<HTMLDivElement> {
  children: ReactElement | ReactElement[];
  headerClassname?: string; 
}
