import style from '@/components/ScriptsPanel/components/EmptyScript/EmptyScript.module.css';
import type Props from '@/components/ScriptsPanel/components/EmptyScript/EmptyScript.props';
import cn from 'classnames';
import type { FC } from 'react';
import { emptyScriptUsecase } from '@/components/ScriptsPanel/components/EmptyScript/EmptyScript.usecase';
import { AddIcon } from '@/components/icons/Addicon';
import Link from 'next/link';
import { LinkDirection } from '@/shared/consts/links';

export const EmptyScript: FC<Props> = ({}) => {
  return (
    <Link
      href={LinkDirection.CreateScript}
      className={cn(style.layout, style.EmptyScript, 'smoothTransition')}>
      <div className={style.EmptyScript__content}>
        <AddIcon />
        <h2 className={style.EmptyScript__title}>{emptyScriptUsecase.title}</h2>
        <h4>{emptyScriptUsecase.subtitle}</h4>
      </div>
    </Link>
  );
};
