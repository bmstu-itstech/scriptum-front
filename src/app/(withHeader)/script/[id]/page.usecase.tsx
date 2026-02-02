import * as Yup from 'yup';

type FieldType = 'integer' | 'real' | 'string';
interface PatternMap {
  integer: RegExp;
  real: RegExp;
  string: RegExp;
}

export const patterns: PatternMap = {
  integer: /^-?\d+$/,
  real: /^-?\d+(\.\d+)?$/,
  string: /^.+$/,
};

const in_fieldsSchema = Yup.object({
  type: Yup.string()
    .oneOf(['integer', 'real', 'string'], 'Неверный тип')
    .required('Название обязательно'),
  data: Yup.string()
    .required('Данные обязательны')
    .min(1, 'Минимум 1 символ')
    .max(50, 'Максимум 50 символов')
    .test({
      name: 'match-type',
      test(value, context) {
        const { parent, createError, path } = context;
        const type: FieldType = parent.type as FieldType;
        const regex = patterns[type];
        const isValid = regex.test(value);
        if (!isValid) {
          return createError({
            path,
            message: `Поле должно соответствовать типу "${type}"`,
          });
        }
        return true;
      },
    }),
});

export const runScriptValidationSchema = Yup.object({
  in_params: Yup.array().of(in_fieldsSchema),
  notify_by_email: Yup.boolean(),
});
