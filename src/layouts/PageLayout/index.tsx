import type {Props} from '@/layouts/PageLayout/PageLayout.props';
import {Container} from '@/shared/Container';
import type {FC} from 'react';
import styles from '@/layouts/PageLayout/PageLayout.module.css';
import cn from 'classnames';

export const PageLayout: FC<Props> = ({title, subtitle, children, className, ...props}) => {
  return (
    <Container {...props} className={cn(styles.main, className)}>
      {title && <h1 className={cn(styles.title, 'layout__title')}>{title}</h1>}
      {subtitle && <h3 className={cn(styles.subtitle, 'layout__subtitle')}>{subtitle}</h3>}
      {children}
    </Container>
  );
};
