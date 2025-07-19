import {Props} from '@/layouts/ScriptParametrsLayout/components/ScriptParametrLayout/ScriptParametr.props';
export const ScriptInputParametr1 : Props = {
  title: 'Diametr',
  translation: 'Диаметр трубы',
  type: 'Вещественные числа',
  measure: 'м.',
};

export const ScriptInputParametr2 : Props = {
  title: 'GradientPreassure',
  translation: 'Градиент давления',
  type: 'Вещественные числа',
  measure: 'бар./м.',
};

export const ScriptInputParametr3: Props = {
  title: 'Roughness',
  translation: 'Шероховатость трубы',
  type: 'Целое число',
  measure: 'ед.',
};

export const ScriptOutputParametr1: Props = {
  title: 'DPGrav',
  translation: 'Потери давления награвитацию',
  type: 'Вещественные числа',
  measure: 'м.',
};
