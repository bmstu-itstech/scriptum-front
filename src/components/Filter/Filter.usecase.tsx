import { PipelineStatus } from '@/shared/consts/pipeline';
import type { GroupBase, StylesConfig } from 'react-select';

export type Option = {value: string; label: string};

export const statusUsecase = [
  {value: 'all', label: 'Все статусы'},
  {value: PipelineStatus.OK, label: 'Успешно'},
  {value: PipelineStatus.ERROR, label: 'Ошибка'},
  {value: PipelineStatus.RUNNING, label: 'Выполняется'},
];

export  const colourStyles: StylesConfig<Option, false, GroupBase<Option>> = {
  control: (base, state) => ({
    ...base,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    height: '100%',
    padding: '0rem 0rem 0rem 1.75rem',
  }),
  option: (base, state) => ({
    ...base,
    cursor: 'pointer',
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

  singleValue: base => ({
    ...base,
    background: 'var(--color-white)',
    color: 'var(--color-dark-main)',
    fontSize: 'var(--font-size-base)',
    outline: 'none',
  }),
  placeholder: base => ({
    ...base,
    background: 'var(--color-white)',
    color: 'var(--color-dark-main)',
    fontSize: 'var(--font-size-base)',
  }),
  menuList: base => ({
    ...base,
    paddingBlock: '0px',
  }),
};