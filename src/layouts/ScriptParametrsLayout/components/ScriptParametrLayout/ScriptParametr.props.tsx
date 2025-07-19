import type {HTMLAttributes, ReactElement} from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  type: string;
  title: string;
  translation: string;
  measure: string;
}

export type ScriptParametrWithTypeOfCard = Props & {typeOfCard: string};
