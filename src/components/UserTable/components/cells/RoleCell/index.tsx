'use client';
import { FC } from 'react';
import styles from './RoleCell.module.css';
import { ShieldIcon } from '@/components/icons/ShieldIcon';
import { UserIcon } from '@/components/icons/UserIcon';
import { Role } from '@/shared/api/generated/data-contracts';
import { Props } from './RoleCell.props';
import cn from 'classnames';
import generalStyle from './../../../UserTable.module.css';

export const RoleCell: FC<Props> = ({ isEditing, editData, user, onRoleChange }) => {
  return (
    <div className={cn(generalStyle.rowCell, styles.roleCell)}>
      {isEditing ? (
        <label className={styles.roleCheckbox}>
          <input type='checkbox' checked={editData.role === Role.Admin} onChange={onRoleChange} />
          <span className={styles.checkmark}></span>
          <span className={styles.roleLabel}>Администратор</span>
        </label>
      ) : user.role === Role.Admin ? (
        <>
          <ShieldIcon className={styles.roleAdminIcon} />
          <span className={styles.roleAdmin}>Администратор</span>
        </>
      ) : (
        <>
          <UserIcon className={styles.roleUserIcon} />
          <span className={styles.roleUser}>Пользователь</span>
        </>
      )}
    </div>
  );
};
