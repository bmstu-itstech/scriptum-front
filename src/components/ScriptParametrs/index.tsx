'use client';
import type { Props } from '@/components/ScriptParametrs/ScriptParametrs.props';
import type { FC } from 'react';
// import cn from 'classnames';
// import styles from '@/components/ScriptParametrs/ScriptParametrs.module.css';
import { ScriptParametrsLayout } from '@/layouts/ScriptParametrsLayout';
import { ExtendedBlock } from '@/shared/ExtendedBlock';
import styles from '@/components/ScriptParametrs/ScriptParametrs.module.css';

export const ScriptParametrs: FC<Props> = ({
  header,
  className,
  contentClassname,
  innerContentClassname,
  children,
  autoExpand,
  ...props
}) => {
  return (
    <ScriptParametrsLayout header={header} className={className} {...props}>
      <div className={styles.innerContent}>
        <ExtendedBlock
          autoExpand={autoExpand}
          innerContentClassname={innerContentClassname}
          contentClassname={contentClassname}>
          {children}
        </ExtendedBlock>
      </div>
    </ScriptParametrsLayout>
  );
};
