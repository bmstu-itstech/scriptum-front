import type { HTMLAttributes } from 'react';
import { IScript } from '@/domain/entities/script';

export type Props = HTMLAttributes<HTMLAnchorElement> & IScript & {
  refetch: () => void;
}
