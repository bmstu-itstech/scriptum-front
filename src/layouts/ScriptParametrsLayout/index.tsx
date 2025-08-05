'use client';
import {Props} from '@/layouts/ScriptParametrsLayout/ScriptParametrsLayout.props';
import {useCallback, type FC, useState} from 'react';
import cn from 'classnames';
import styles from '@/layouts/ScriptParametrsLayout/ScriptParametrsLayout.module.css';
import {ExtendedBlock} from '@/shared/ExtendedBlock';
export const ScriptParametrsLayout: FC<Props> = ({
  header,
  preBlock,
  mainExtendedClassname,
  headerClassname,
  contentClassname,
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn(className, styles.ScriptParametrsLayout)} {...props}>
      <div className={cn(styles.ScriptParametrsLayout__header, headerClassname)}>{header}</div>
      {preBlock}
      <ExtendedBlock
        mainExtendedClassname={mainExtendedClassname}
        contentClassname={contentClassname}>
        {children}
      </ExtendedBlock>
    </div>
  );
};
