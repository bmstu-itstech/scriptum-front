import {
  ScriptInputParametr1,
  ScriptInputParametr2,
  ScriptInputParametr3,
  ScriptOutputParametr1,
} from '@/layouts/ScriptParametrsLayout/components/ScriptParametrLayout/ScriptParametrLayout.usecase';

export const ScriptParametersLayoutUsecase1 = {
  params: {
    input: [ScriptInputParametr1, ScriptInputParametr2, ScriptInputParametr3],
    output: [ScriptOutputParametr1],
  },
};
