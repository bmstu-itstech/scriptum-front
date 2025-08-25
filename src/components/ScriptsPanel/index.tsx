import type { FC } from 'react';
import styles from './ScriptPanel.module.css';
import { ScriptElement } from './components/ScriptElement';
import { EmptyScript } from './components/EmptyScript';
import cn from 'classnames';
import { Props } from './ScriptsPanel.props';
import { getDate } from '@/utils/getRowFromDate';

export const ScriptPanel: FC<Props> = ({ scripts, className, ...props }) => {
  return (
    <div className={cn(styles.scriptsPanel, className)} {...props}>
      <div className={styles.scriptsList}>
        {scripts.length > 0 ? (
          scripts.map((script) => (
            <ScriptElement
              key={script.script_id}
              script_id={script.script_id}
              script_name={script.script_name}
              script_description={script.script_description}
              in_fields={script.in_fields}
              out_fields={script.out_fields}
              file_id={script.file_id}
              owner={script.owner}
              visibility={script.visibility}
              refetch={script.refetch}
              created_at={getDate(script.created_at)}
              
            // className={cn()}
            />
          ))
        ) : (
          <EmptyScript />
        )}
      </div>
    </div>
  );
};
