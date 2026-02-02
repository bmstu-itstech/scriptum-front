'use client';
import { FC } from 'react';
import styles from './PasswordCell.module.css';
import { Props } from './PasswordCell.props';
import cn from 'classnames';
import generalStyle from './../../../UserTable.module.css';

export const PasswordCell: FC<Props> = ({
  isEditing,
  editData,
  errors,
  onInputChange,
  onInputBlur,
}) => {
  return (
    <div className={cn(generalStyle.rowCell, styles.passwordCell)}>
      {isEditing ? (
        <>
          <input
            type='password'
            name='password'
            value={editData.password}
            onChange={onInputChange}
            onBlur={() => onInputBlur('password')}
            className={cn(generalStyle.editInput, {
              [generalStyle.invalidInput]: errors.password,
            })}
            placeholder='Новый пароль (необязательно)'
            autoComplete='new-password'
          />
          {editData.password && (
            <input
              type='password'
              name='confirmPassword'
              value={editData.confirmPassword}
              onChange={onInputChange}
              onBlur={() => onInputBlur('password')}
              className={cn(generalStyle.editInput, {
                [generalStyle.invalidInput]: errors.password,
              })}
              placeholder='Повторите пароль'
              autoComplete='new-password'
            />
          )}
          {errors.password && <span className={generalStyle.errorMessage}>{errors.password}</span>}
        </>
      ) : (
        <p className={styles.passwordPlaceholder}>••••••••</p>
      )}
    </div>
  );
};
