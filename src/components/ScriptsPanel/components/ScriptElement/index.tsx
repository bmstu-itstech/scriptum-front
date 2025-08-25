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
import { EditIcon } from '@/components/icons/EditIcon';
import { DialogLayout } from '@/layouts/DialogLayout';
import { PopupLayout } from '@/layouts/PopupLayout';
import { RunCodeButton } from '@/shared/RunCodeButton';
import { useDeleteScript } from '@/hooks/script/useDeleteScript';

export const ScriptElement: FC<Props> = ({
  script_id,
  script_name,
  script_description,
  // in_fields,
  // out_fields,
  // file_id,
  owner,
  // visibility,
  created_at,
  className,
  refetch,
  ...props
}) => {
  const [popup, setPopup] = useState<{
    visible: boolean;
    variant: 'success' | 'error' | 'warning';
    title: string;
    description?: string;
  } | null>(null);

  const showPopup = (
    variant: 'success' | 'error' | 'warning',
    title: string,
    description?: string,
  ) => {
    setPopup({ visible: true, variant, title, description });
    setTimeout(() => setPopup(null), 5000);
  };

  const [dialog, setDialog] = useState<{
    visible: boolean;
    type: 'save' | 'delete';
    scriptId?: number;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);
  const { mutate } = useDeleteScript();

  const handleDeleteClick = (scriptId: number) => {
    setDialog({
      visible: true,
      type: 'delete',
      scriptId,
      title: 'Подтвердите удаление',
      message: `Вы уверены, что хотите удалить скрипт "${script_name}"?`,
      onConfirm: () => {
        mutate(scriptId, {
          onSuccess: () => {
            refetch();
          },
        });
        showPopup('success', 'Скрипт удалён', `Скрипт "${script_name}" был удалён`);
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

      {popup && (
        <PopupLayout
          variant={popup.variant}
          title={popup.title}
          description={popup.description || ''}
          onClose={() => setPopup(null)}
        />
      )}

      <Link
        href={`/script/${script_id}`}
        className={cn(className, styles.scriptElement, basicStyles.layout)}
        {...props}>
        <div className={styles.scriptElement__supblock}>
          <h2 className={styles.scriptElement__title}>{script_name}</h2>
        </div>

        <h3 className={styles.scriptElement__subtitle}>{script_description}</h3>
        <div className={styles.scriptElement__info}>
          <TextWithIcon icon={<PersonIcon />} className={styles.scriptElement__author}>
            {owner}
          </TextWithIcon>
          <TextWithIcon icon={<CalendarIcon />} className={styles.scriptElement__data}>
            {created_at}
          </TextWithIcon>
        </div>
        <div className={styles.scriptElement__interactive}>
          <RunCodeButton />
          <span className={cn(styles.scriptElement__editIcon, 'smoothTransition')}>
            <EditIcon />
          </span>
          <span
            onClick={(e) => {
              e.preventDefault();
              handleDeleteClick(script_id);
            }}
            className={cn(styles.scriptElement__delIcon, 'smoothTransition')}>
            <DeleteIcon />
          </span>
        </div>
      </Link>
    </>
  );
};
