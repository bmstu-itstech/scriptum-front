'use client';
import { FC } from 'react';
import styles from './UserInfoCell.module.css';
import { Props } from './UserInfoCell.props';
import cn from 'classnames';
import generalStyle from './../../../UserTable.module.css';

export const UserInfoCell: FC<Props> = ({
  isEditing,
  editData,
  errors,
  user,
  onInputChange,
  onInputBlur,
}) => {
  return (
    <div className={cn(generalStyle.rowCell, styles.userCell)}>
      {isEditing ? (
        <>
          <input
            type='text'
            name='name'
            value={editData.name}
            onChange={onInputChange}
            onBlur={() => onInputBlur('name')}
            className={cn(generalStyle.editInput, {
              [generalStyle.invalidInput]: errors.name,
            })}
            placeholder='ФИО'
            required
          />
          {errors.name && <span className={generalStyle.errorMessage}>{errors.name}</span>}
          <input
            type='email'
            name='email'
            value={editData.email}
            onChange={onInputChange}
            onBlur={() => onInputBlur('email')}
            className={cn(generalStyle.editInput, {
              [generalStyle.invalidInput]: errors.email,
            })}
            placeholder='Email'
            required
          />
          {errors.email && <span className={generalStyle.errorMessage}>{errors.email}</span>}
        </>
      ) : (
        <>
          <p className={styles.userName}>{user.name}</p>
          <p className={styles.userEmail}>{user.email}</p>
        </>
      )}
    </div>
  );
};
