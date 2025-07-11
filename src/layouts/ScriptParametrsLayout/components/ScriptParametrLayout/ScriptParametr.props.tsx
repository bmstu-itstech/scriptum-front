import type {IScriptItem} from '@/components/ScriptsPanel/components/ScriptElement/ScriptElement.props';
import type {HTMLAttributes, ReactNode} from 'react';

export interface IInputData extends HTMLAttributes<HTMLDivElement> {
  title: string;
  translation: string;
  type: string;
  measure: string;
}

export interface IOutputData extends HTMLAttributes<HTMLDivElement> {
  title: string;
  translation: string;
  type: string;
  measure: string;
}

export type Props = (IInputData | IOutputData) & {typeOfCard: 'input' | 'output'};
