import type { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  type: string;
  name: string;
  description: string;
  unit: string;
}

export type ScriptParametrWithTypeOfCard = Props & { typeOfCard: string; formikName?: string };
