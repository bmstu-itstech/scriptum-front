import type { HTMLAttributes } from 'react';
import type { Blueprint } from '@/shared/api/generated/data-contracts';

export type Props = HTMLAttributes<HTMLAnchorElement> &
  Blueprint & {
    refetch: () => void;
    currentUserId?: string;
  };
