import type { FC } from 'react';
import styles from './ScriptPanel.module.css';
import { ScriptElement } from './components/ScriptElement';
import { EmptyScript } from './components/EmptyScript';
import cn from 'classnames';
import { Props } from './ScriptsPanel.props';

export const ScriptPanel: FC<Props> = ({ scripts, currentUserId, className, ...props }) => {
  return (
    <div className={cn(styles.scriptsPanel, className)} {...props}>
      <div className={styles.scriptsList}>
        {scripts.length > 0 ? (
          scripts.map((script) => (
            <ScriptElement
              key={script.id}
              id={script.id}
              name={script.name}
              desc={script.desc}
              in={script.in}
              out={script.out}
              archiveID={script.archiveID}
              ownerID={script.ownerID}
              ownerName={script.ownerName}
              visibility={script.visibility}
              refetch={script.refetch}
              createdAt={script.createdAt}
              currentUserId={currentUserId}
            />
          ))
        ) : (
          <EmptyScript />
        )}
      </div>
    </div>
  );
};
