import type Props from '@/shared/TextWithIcon/TextWithIcon.props';
import type {FC} from 'react';
import cn from 'classnames';
import styles from '@/shared/TextWithIcon/TextWithIcon.module.css';

export const TextWithIcon: FC<Props> = ({children, icon, className, ...props}) => {
  return (
    <p className={cn(className, styles.p)} {...props}>
      {icon}
      {children}
    </p>
  );
};
