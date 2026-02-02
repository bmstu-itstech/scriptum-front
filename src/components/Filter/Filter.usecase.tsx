import { Role } from '@/shared/api/generated/data-contracts';
import { ParametrType } from '@/shared/consts/parametr';
import { PipelineStatus } from '@/shared/consts/pipeline';
import type { GroupBase, StylesConfig } from 'react-select';

export type Option = { value: string; label: string };

export const statusUsecase = [
  { value: 'all', label: 'Все статусы' },
  { value: PipelineStatus.OK, label: 'Успешно' },
  { value: PipelineStatus.ERROR, label: 'Ошибка' },
  { value: PipelineStatus.RUNNING, label: 'Выполняется' },
];

export const roleUsecase = [
  { value: 'all', label: 'Все роли' },
  { value: Role.Admin, label: 'Администраторы' },
  { value: Role.User, label: 'Пользователи' },
];

export const ownerFilterUsecase = [
  { value: 'all', label: 'Все' },
  { value: 'mine', label: 'Мои' },
  { value: 'others', label: 'Общие' },
];

export const typeUsecase = [
  { value: ParametrType.FLOAT, label: ParametrType.FLOAT },
  { value: ParametrType.INT, label: ParametrType.INT },
  { value: ParametrType.STR, label: ParametrType.STR },
];

export const colourStyles: StylesConfig<Option, false, GroupBase<Option>> = {
  control: (base) => ({
    ...base,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    height: '100%',
    minHeight: '100%',
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),

  container: (base, state) => ({
    ...base,
    border: state.isFocused
      ? '2px solid var(--color-purple-main)'
      : '2px solid var(--color-gray-border)',
    '&:hover': {
      border: state.isFocused
        ? '2px solid var(--color-purple-main)'
        : '2px solid var(--color-gray-border2)',
    },
  }),

  menuList: (base) => ({
    ...base,
    paddingBlock: '0px',
  }),
  valueContainer: (base) => ({
    ...base,
    paddingInlineStart: '1rem',
  }),
};

export const pageSelectStyles: StylesConfig<Option, false, GroupBase<Option>> = {
  placeholder: (base) => ({
    ...base,
    background: 'var(--color-white)',
    color: 'var(--color-gray-close-modal)',
    userSelect: 'none',
    fontSize: 'var(--font-size-base)',
    textWrap: 'nowrap',
  }),
  singleValue: (base) => ({
    ...base,
    background: 'var(--color-white)',
    color: 'var(--color-dark-main)',
    fontSize: 'var(--font-size-base)',
    outline: 'none',
  }),
  option: (base, state) => ({
    ...base,
    cursor: 'pointer',
    fontSize: 'var(--font-size-sm)',
    background:
      state.isFocused && !state.isSelected
        ? 'var(--color-purple-border)'
        : state.isSelected
          ? 'var(--color-purple-main)'
          : 'var(--color-white-main)',
    color: state.isSelected ? 'var(--color-white-main)' : 'var(--color-dark-main)',
    ':active': {
      ...base[':active'],
      backgroundColor: !state.isDisabled
        ? state.isSelected
          ? 'var(--color-purple-main)'
          : 'var(--color-purple-border)'
        : undefined,
    },
  }),
};

export const selectStyles: StylesConfig<Option, false, GroupBase<Option>> = {
  placeholder: (base) => ({
    ...base,
    background: 'var(--color-white)',
    color: 'var(--color-gray-close-modal)',
    userSelect: 'none',
    fontSize: 'var(--font-size-sm)',
    textWrap: 'nowrap',
  }),
  singleValue: (base) => ({
    ...base,
    background: 'var(--color-white)',
    color: 'var(--color-dark-main)',
    fontSize: 'var(--font-size-sm)',
    outline: 'none',
  }),
  option: (base, state) => ({
    ...base,
    cursor: 'pointer',
    fontSize: 'var(--font-size-sm)',
    background:
      state.isFocused && !state.isSelected
        ? 'var(--color-purple-border)'
        : state.isSelected
          ? 'var(--color-purple-main)'
          : 'var(--color-white-main)',
    color: state.isSelected ? 'var(--color-white-main)' : 'var(--color-dark-main)',
    ':active': {
      ...base[':active'],
      backgroundColor: !state.isDisabled
        ? state.isSelected
          ? 'var(--color-purple-main)'
          : 'var(--color-purple-border)'
        : undefined,
    },
  }),
};
