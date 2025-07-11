export const ScriptParametersUsecase1 = {
  params: {
    input: [
      {
        title: 'Diametr',
        translate: 'Диаметр трубы',
        type: 'Вещественные числа',
        measure: 'м.',
      },
      {
        title: 'GradientPreassure',
        translate: 'Градиент давления',
        type: 'Вещественные числа',
        measure: 'бар./м.',
      },
      {
        title: 'Roughness',
        translate: 'Шероховатость трубы',
        type: 'Целое число',
        measure: 'ед.',
      },
    ],
    output: [
      {
        title: 'DPGrav',
        translate: 'Потери давления награвитацию',
        type: 'Вещественные числа',
        measure: 'м.',
      },
    ],
  },
};
