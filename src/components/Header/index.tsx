import {FC} from 'react';
import {HeaderLayout} from '@/layouts/HeaderLayout';
import {Props} from './Header.props';
import {HeaderUsecase} from './Header.usecase';

export const Header: FC<Props> = ({className, ...props}) => {
  return (
    <HeaderLayout
      head={HeaderUsecase.head}
      center={HeaderUsecase.center}
      tail={HeaderUsecase.tail}
      className={className}
      {...props}
    />
  );
};
