'use client';
import { FC, useState } from 'react';
import styles from './UserTable.module.css';
import cn from 'classnames';
import type { User } from '@/shared/api/generated/data-contracts';
import { UserRow } from './components/UserRow';
import { UserTableHeader } from './components/UserTableHeader';
import { DialogLayout } from '@/layouts/DialogLayout';
import { Props } from './UserTable.props';

type DialogState = {
  visible: boolean;
  type: 'save' | 'delete';
  userId?: string;
  title: string;
  message: string;
  onConfirm: () => void;
} | null;

export const UserTable: FC<Props> = ({
  users,
  currentUserId,
  className,
  onEditUser,
  onDeleteUser,
}) => {
  const [dialog, setDialog] = useState<DialogState>(null);

  const orderedUsers =
    currentUserId != null
      ? [...users].sort((a, b) => (a.id === currentUserId ? -1 : b.id === currentUserId ? 1 : 0))
      : users;

  const handleEditUser = (user: User) => {
    setDialog({
      visible: true,
      type: 'save',
      title: 'Подтвердите сохранение',
      message: `Вы уверены, что хотите сохранить изменения для пользователя ${user.email}?`,
      onConfirm: () => {
        onEditUser(user);
        setDialog(null);
      },
    });
  };

  const handleDeleteUser = (userId: string) => {
    const user = orderedUsers.find((u) => u.id === userId);
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
        {orderedUsers.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            isCurrentUser={user.id === currentUserId}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
          />
        ))}
      </div>
    </div>
  );
};
