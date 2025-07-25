import type {Props} from '@/components/ScriptsPanel/components/ScriptElement/ScriptElement.props';
import {useState, type FC} from 'react';
import cn from 'classnames';
import styles from '@/components/ScriptsPanel/components/ScriptElement/ScriptElement.module.css';
import basicStyles from '@/components/ScriptsPanel/components/EmptyScript/EmptyScript.module.css';
import {Button} from '@/shared/Button';
import {RunIcon} from '@/components/icons/RunIcon';
import {getDate} from '@/utils/getRowFromDate';
import {TextWithIcon} from '@/shared/TextWithIcon';
import {PersonIcon} from '@/components/icons/PersonIcon';
import {CalendarIcon} from '@/components/icons/CalendarIcon';
import Link from 'next/link';
import {DeleteIcon} from '@/components/icons/DeleteIcon';
import {EditIcon} from '@/components/icons/EditIcon';
import {DialogLayout} from '@/layouts/DialogLayout';
import {PopupLayout} from '@/layouts/PopupLayout';
import {RunCodeButton} from '@/shared/RunCodeButton';

export const ScriptElement: FC<Props> = ({
  scriptTitle,
  scriptId,
  countOfRuns,
  subtitle,
  author,
  data,
  onDeleteScript,
  className,
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
    setPopup({visible: true, variant, title, description});
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

  const handleDeleteClick = (scriptId: number) => {
    setDialog({
      visible: true,
      type: 'delete',
      scriptId,
      title: 'Подтвердите удаление',
      message: `Вы уверены, что хотите удалить скрипт "${scriptTitle}"?`,
      onConfirm: () => {
        onDeleteScript(scriptId);
        showPopup('success', 'Скрипт удалён', `Скрипт "${scriptTitle}" был удалён`);
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
        href={`/script/${scriptId}`}
        className={cn(className, styles.scriptElement, basicStyles.layout)}
        {...props}>
        <div className={styles.scriptElement__supblock}>
          <h2 className={styles.scriptElement__title}>{scriptTitle}</h2>
          <p className={styles.scriptElement__runs}>Кол. запусков: {countOfRuns}</p>
        </div>

        <h3 className={styles.scriptElement__subtitle}>{subtitle}</h3>
        <div className={styles.scriptElement__info}>
          <TextWithIcon icon={<PersonIcon />} className={styles.scriptElement__author}>
            {author}
          </TextWithIcon>
          <TextWithIcon icon={<CalendarIcon />} className={styles.scriptElement__data}>
            {getDate(data)}
          </TextWithIcon>
        </div>
        <div className={styles.scriptElement__interactive}>
          <RunCodeButton scriptId={scriptId} />
          <span className={cn(styles.scriptElement__editIcon, 'smoothTransition')}>
            <EditIcon />
          </span>
          <span
            onClick={e => {
              e.preventDefault();
              handleDeleteClick(scriptId);
            }}
            className={cn(styles.scriptElement__delIcon, 'smoothTransition')}>
            <DeleteIcon />
          </span>
        </div>
      </Link>
    </>
  );
};
