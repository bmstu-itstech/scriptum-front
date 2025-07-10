import type {Props} from '@/components/ScriptsPanel/ScriptsPanel.props';
import type {FC} from 'react';
import cn from 'classnames';
import styles from '@/components/ScriptsPanel/ScriptPanel.module.css';
import {ScriptsPanelUsecase} from '@/components/ScriptsPanel/ScriptsPanel.usecase';
import {ScriptElement} from '@/components/ScriptsPanel/components/ScriptElement';

export const ScriptPanel: FC<Props> = ({className, ...props}) => {
  // const {data, isLoading} = useGetUserScript()
  return (
    <div className={cn(className, styles.scriptPanel)} {...props}>
      <h4 className={styles.scriptPanel__title}>Всего скриптов: {ScriptsPanelUsecase.length}</h4>
      <div className={cn(styles.scriptPanel__items)}>
        {ScriptsPanelUsecase.map(item => {
          return <ScriptElement {...item} key={item.id} />;
        })}
      </div>
    </div>
  );
};
