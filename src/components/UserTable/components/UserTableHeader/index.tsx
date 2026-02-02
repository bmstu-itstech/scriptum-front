'use client';
import style from './UserInfoCell.module.css';
import generalStyle from './../../UserTable.module.css';
import cn from 'classnames';

export const UserTableHeader = () => {
  return (
    <div className={cn(generalStyle.tableRow, style.headerRow)}>
      <p className={cn(generalStyle.rowCell, style.headerCell)}>ПОЛЬЗОВАТЕЛЬ</p>
      <p className={cn(generalStyle.rowCell, style.headerCell)}>ПАРОЛЬ</p>
      <p className={cn(generalStyle.rowCell, style.headerCell)}>РОЛЬ</p>
      <p className={cn(generalStyle.rowCell, style.headerCell)}>ДЕЙСТВИЯ</p>
    </div>
  );
};
