import type { Props } from '@/components/ScriptsPanel/components/ScriptElement/ScriptElement.props';
import { useState, type FC } from 'react';
import cn from 'classnames';
import styles from '@/components/ScriptsPanel/components/ScriptElement/ScriptElement.module.css';
import basicStyles from '@/components/ScriptsPanel/components/EmptyScript/EmptyScript.module.css';
import { TextWithIcon } from '@/shared/TextWithIcon';
import { PersonIcon } from '@/components/icons/PersonIcon';
import { CalendarIcon } from '@/components/icons/CalendarIcon';
import Link from 'next/link';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { DialogLayout } from '@/layouts/DialogLayout';
import { RunCodeButton } from '@/shared/RunCodeButton';
import { useDeleteScript } from '@/hooks/script/useDeleteScript';
import { useCustomToast } from '@/hooks/other/useCustomToast';
import { getDate } from '@/utils/getRowFromDate';

export const ScriptElement: FC<Props> = ({
  id,
  name,
  desc,
  ownerID,
  ownerName,
  createdAt,
  className,
  refetch,
  archiveID,
  visibility,
  in: inFields,
  out: outFields,
  currentUserId,
  ...props
}) => {
  const notify = useCustomToast();
  const [dialog, setDialog] = useState<{
    visible: boolean;
    type: 'save' | 'delete';
    scriptId?: string;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);
  const { mutate } = useDeleteScript();

  const canDelete = currentUserId && currentUserId === ownerID;

  const handleDeleteClick = (scriptId: string) => {
    setDialog({
      visible: true,
      type: 'delete',
      scriptId,
      title: 'Подтвердите удаление',
      message: `Вы уверены, что хотите удалить скрипт "${name}"?`,
      onConfirm: () => {
        mutate(scriptId, {
          onSuccess: () => {
            refetch();
            notify('Скрипт успешно удалён', 'success');
          },
          onError: (error) => {
            notify(error?.message || 'Не удалось удалить скрипт', 'error');
          },
        });
        setDialog(null);
      },
    });
  };

  return (
    <>
      {dialog && (
        <DialogLayout
          type='confirm'
          title={dialog.title}
          message={dialog.message}
          isVisible={dialog.visible}
          onClose={() => setDialog(null)}
          onConfirm={dialog.onConfirm}
          confirmText={dialog.type === 'save' ? 'Сохранить' : 'Удалить'}
          cancelText='Отмена'
        />
      )}

      <Link
        href={`/script/${id}`}
        className={cn(className, styles.scriptElement, basicStyles.layout)}
        {...props}>
        <div className={styles.scriptElement__supblock}>
          <h2 className={styles.scriptElement__title}>{name}</h2>
        </div>

        <h3 className={styles.scriptElement__subtitle}>{desc || ''}</h3>
        <div className={styles.scriptElement__info}>
          <TextWithIcon icon={<PersonIcon />} className={styles.scriptElement__author}>
            <span className={styles.scriptElement__authorText}>{ownerName}</span>
          </TextWithIcon>
          <TextWithIcon icon={<CalendarIcon />} className={styles.scriptElement__data}>
            {getDate(createdAt)}
          </TextWithIcon>
        </div>
        <div className={styles.scriptElement__interactive}>
          <RunCodeButton />
          {canDelete && (
            <span
              onClick={(e) => {
                e.preventDefault();
                handleDeleteClick(id);
              }}
              className={cn(styles.scriptElement__delIcon, 'smoothTransition')}>
              <DeleteIcon />
            </span>
          )}
        </div>
      </Link>
    </>
  );
};
