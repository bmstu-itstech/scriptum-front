import {RunIcon} from '@/components/icons/RunIcon';
import {Button} from '@/shared/Button';
import {Props} from './RunCodeButton.props';
import type {FC} from 'react';

export const RunCodeButton: FC<Props> = ({scriptId, className, ...props}) => {
  return (
    <Button icon={<RunIcon />} className={className} {...props}>
      Запустить
    </Button>
  );
};
