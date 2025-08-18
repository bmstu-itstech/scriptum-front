'use client';
import { FC } from 'react';
import { DocumentIcon } from '@/components/icons/DocumentIcon';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { EditIcon } from '@/components/icons/EditIcon';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { Props } from './ActionsCell.props';
import styles from './ActionsCell.module.css';
import generalStyle from './../../../UserTable.module.css';
import cn from 'classnames';

export const ActionsCell: FC<Props> = ({
  isEditing,
  errors,
  onEdit,
  onCancel,
  onSave,
  onDelete,
}) => {
  return (
    <div className={cn(generalStyle.rowCell, styles.actionsCell)}>
      {isEditing ? (
        <>
          <button
            onClick={onSave}
            disabled={Object.values(errors).some((error) => error !== null)}
            className={cn(styles.actionButton, styles.saveIcon, {
              [styles.disabledButton]: Object.values(errors).some((error) => error !== null),
            })}
            title='Сохранить'>
            <DocumentIcon width={16} height={16} />
          </button>
          <button
            onClick={onCancel}
            className={cn(styles.actionButton, styles.cancelIcon)}
            title='Отменить'>
            <CloseIcon width={16} height={16} />
          </button>
        </>
      ) : (
        <>
          <button
            onClick={onEdit}
            className={cn(styles.actionButton, styles.editIcon)}
            title='Редактировать'>
            <EditIcon width={16} height={16} />
          </button>
          <button
            onClick={onDelete}
            className={cn(styles.actionButton, styles.delIcon)}
            title='Удалить'>
            <DeleteIcon width={16} height={16} />
          </button>
        </>
      )}
    </div>
  );
};
