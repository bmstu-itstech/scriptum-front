import type {IScriptItem} from '@/components/ScriptsPanel/components/ScriptElement/ScriptElement.props';
import type {HTMLAttributes, ReactNode} from 'react';

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

export interface Props extends IScript {
  typeOfCard: 'input' | 'output';
  header: ReactNode;
}
