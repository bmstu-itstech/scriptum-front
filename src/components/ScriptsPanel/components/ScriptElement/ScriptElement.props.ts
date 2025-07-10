import type {HTMLAttributes} from 'react';

export interface IScriptItem {
  id: number;
  title: string;
  subtitle: string;
  countOfRuns: number;
  author: string;
  data: Date;
}

export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'id'>, IScriptItem {}
