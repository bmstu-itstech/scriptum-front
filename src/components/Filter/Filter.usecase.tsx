import { ParametrType, ParametrMeasure } from '@/shared/consts/parametr';
import { PipelineStatus } from '@/shared/consts/pipeline';
import { UserRole } from '@/shared/consts/user';
import type { GroupBase, StylesConfig } from 'react-select';

export type Option = {value: string; label: string};

export const statusUsecase = [
  {value: 'all', label: 'Все статусы'},
  {value: PipelineStatus.OK, label: 'Успешно'},
  {value: PipelineStatus.ERROR, label: 'Ошибка'},
  {value: PipelineStatus.RUNNING, label: 'Выполняется'},
];

export const roleUsecase = [
  {value: 'all', label: 'Все роли'},
  {value: UserRole.ADMIN, label: 'Администраторы'},
  {value: UserRole.USER, label: 'Пользователи'},
];

export const measureUsecase = [
  {value: ParametrMeasure.None, label: 'Безразмерная'},
  {value: ParametrMeasure.M, label: 'Метры (м)'},
  {value: ParametrMeasure.CM, label: 'Сантиметры (см)'},
  {value: ParametrMeasure.MM, label: 'Миллиметры (мм)'},
  {value: ParametrMeasure.T, label: 'Тонны (т)'},
  {value: ParametrMeasure.KG, label: 'Килограммы (кг)'},
  {value: ParametrMeasure.G, label: 'Граммы (г)'},
];

export const typeUsecase = [
  {value: ParametrType.FLOAT, label: ParametrType.FLOAT},
  {value: ParametrType.INT, label: ParametrType.INT},
  {value: ParametrType.COMP, label: ParametrType.COMP},
];

export  const colourStyles: StylesConfig<Option, false, GroupBase<Option>> = {
  control: (base, state) => ({
    ...base,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    height: '100%',
  }),
  // option: (base, state) => ({
  //   ...base,
  //   cursor: 'pointer',
  //   // fontSize: 'var(--font-size-sm)',
  //   background:
  //     state.isFocused && !state.isSelected
  //       ? 'var(--color-purple-border)'
  //       : state.isSelected
  //       ? 'var(--color-purple-main)'
  //       : 'var(--color-white-main)',
  //   color: state.isSelected ? 'var(--color-white-main)' : 'var(--color-dark-main)',
  //   ':active': {
  //     ...base[':active'],
  //     backgroundColor: !state.isDisabled
  //       ? state.isSelected
  //         ? 'var(--color-purple-main)'
  //         : 'var(--color-purple-border)'
  //       : undefined,
  //   },
  // }),

  // placeholder: base => ({
  //   ...base,
  //   background: 'var(--color-white)',
  //   color: 'var(--color-gray-close-modal)',
  //   userSelect: 'none',
  //   fontSize: 'var(--font-size-base)',
  //   textWrap: 'nowrap',
  // }),
  menuList: base => ({
    ...base,
    paddingBlock: '0px',
  }),
};

export const pageSelectStyles: StylesConfig<Option, false, GroupBase<Option>> = {
  placeholder: base => ({
    ...base,
    background: 'var(--color-white)',
    color: 'var(--color-gray-close-modal)',
    userSelect: 'none',
    fontSize: 'var(--font-size-base)',
    textWrap: 'nowrap',
  }),
  singleValue: base => ({
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
}


export const selectStyles: StylesConfig<Option, false, GroupBase<Option>> = {
  placeholder: base => ({
    ...base,
    background: 'var(--color-white)',
    color: 'var(--color-gray-close-modal)',
    userSelect: 'none',
    fontSize: 'var(--font-size-sm)',
    textWrap: 'nowrap',
  }),
  singleValue: base => ({
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
}