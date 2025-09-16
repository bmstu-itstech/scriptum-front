'use client';
import { FC, useState } from 'react';
import styles from './UserTable.module.css';
import cn from 'classnames';
import { IUser } from '@/shared/consts/user';
import { UserRow } from './components/UserRow';
import { UserTableHeader } from './components/UserTableHeader';
import { DialogLayout } from '@/layouts/DialogLayout';
import { Props } from './UserTable.props';
import { useCustomToast } from '@/hooks/other/useCustomToast';

type DialogState = {
  visible: boolean;
  type: 'save' | 'delete';
  userId?: number;
  title: string;
  message: string;
  onConfirm: () => void;
} | null;

export const UserTable: FC<Props> = ({ users, className, onEditUser, onDeleteUser }) => {
  const [dialog, setDialog] = useState<DialogState>(null);
  const notify = useCustomToast();

  const handleEditUser = (user: IUser) => {
    setDialog({
      visible: true,
      type: 'save',
      title: 'Подтвердите сохранение',
      message: `Вы уверены, что хотите сохранить изменения для пользователя ${user.email}?`,
      onConfirm: () => {
        onEditUser(user);
        notify(`Данные пользователя ${user.email} обновлены`, 'success');
        setDialog(null);
      },
    });
  };

  const handleDeleteUser = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (!user) {
      return;
    }

    setDialog({
      visible: true,
      type: 'delete',
      userId,
      title: 'Подтвердите удаление',
      message: `Вы уверены, что хотите удалить пользователя ${user.email}?`,
      onConfirm: () => {
        onDeleteUser(userId);
        notify(`Пользователь ${user.email} был удалён`, 'success');
        setDialog(null);
      },
    });
  };

  return (
    <div className={cn(styles.container, className)}>
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
      <div className={styles.usersTable}>
        <UserTableHeader />
        {users.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
          />
        ))}
      </div>
    </div>
  );
};
