'use client';
import { RunIcon } from '@/components/icons/RunIcon';
import { Button } from '@/shared/Button';
import { Props } from './RunCodeButton.props';
import type { FC } from 'react';

export const RunCodeButton: FC<Props> = ({ isLoading = false, className, ...props }) => {
  return (
    <Button type='submit' icon={<RunIcon />} isLoading={isLoading} className={className} {...props}>
      Запустить
    </Button>
  );
};
