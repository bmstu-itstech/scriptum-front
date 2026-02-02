import type { Blueprint } from '@/shared/api/generated/data-contracts';
import type { HTMLAttributes } from 'react';

export type ScriptInfoProps = Pick<Blueprint, 'name' | 'desc' | 'ownerName' | 'createdAt'> &
  HTMLAttributes<HTMLDivElement>;
