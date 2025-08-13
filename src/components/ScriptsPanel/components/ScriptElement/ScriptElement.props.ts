import type { HTMLAttributes } from 'react';
import {IScript} from '@/domain/entities/script'
// export interface IScriptBit {
//   type: string;
//   name: string;
//   description: string;
//   unit: string;
// }

// export interface IScript {
//   script_id: number;
//   fields: IScriptBit[];
//   path: string;
//   owner: number;
//   visibility: 'private' | 'global';
//   created_at: Date;
// }

// export interface IScriptItem  {
// 	scriptId: number;
// 	scriptTitle: string;
// 	subtitle: string;
// 	countOfRuns: number;
// 	author: string;
// 	data: Date;
// 	// onDeleteScript: (scriptId: number) => void;
// }

export interface Props extends HTMLAttributes<HTMLAnchorElement>, IScript {}
