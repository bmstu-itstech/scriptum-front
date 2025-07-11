import style from '@/components/ScriptsPanel/components/EmptyScript/EmptyScript.module.css';
import type Props from '@/components/ScriptsPanel/components/EmptyScript/EmptyScript.props';
import cn from 'classnames';
import type {FC} from 'react';
import {emptyScriptUsecase} from '@/components/ScriptsPanel/components/EmptyScript/EmptyScript.usecase';
import {AddIcon} from '@/components/icons/Addicon';
export const EmptyScript: FC<Props> = ({onClick}) => {
  return (
    <button onClick={onClick} className={cn(style.layout, style.EmptyScript)}>
      <div className={style.EmptyScript__content}>
        <AddIcon />
        <h2 className={style.EmptyScript__title}>{emptyScriptUsecase.title}</h2>
        <h4>{emptyScriptUsecase.subtitle}</h4>
      </div>
    </button>
  );
};
