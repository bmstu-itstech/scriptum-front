import { Props } from '@/layouts/ScriptParametrsLayout/components/ScriptParametrLayout/ScriptParametr.props';
export const ScriptInputParametr1: Props = {
  name: 'Diametr',
  description: 'Диаметр трубы',
  type: 'Вещественные числа',
  unit: 'м.',
};

export const ScriptInputParametr2: Props = {
  name: 'GradientPreassure',
  description: 'Градиент давления',
  type: 'Вещественные числа',
  unit: 'бар./м.',
};

export const ScriptInputParametr3: Props = {
  name: 'Roughness',
  description: 'Шероховатость трубы',
  type: 'Целое число',
  unit: 'ед.',
};

export const ScriptOutputParametr1: Props = {
  name: 'DPGrav',
  description: 'Потери давления награвитацию',
  type: 'Вещественные числа',
  unit: 'м.',
};
