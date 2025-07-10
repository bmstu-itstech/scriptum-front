import type {Props} from '@/shared/Container/Container.props';
import type {FC} from 'react';
import styles from '@/shared/Container/Container.module.css';

export const Container: FC<Props> = ({children}) => {
  return <div className={styles.container}>{children}</div>;
};
