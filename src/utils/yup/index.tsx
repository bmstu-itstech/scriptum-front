import {
    setLocale,
    ObjectSchema,
    string,
    number,
    object,
    ref,
    mixed,
    boolean,
    array,
} from 'yup';

setLocale({
    mixed: {
        default: 'Неверное поле',
        required: 'Поле обязательно',
        oneOf: 'Это поле должно быть одним из следующих значений: ${values}',
        notOneOf: 'Это поле не должно быть одним из следующих значений: ${values}',
    },
    string: {
        length: 'Это поле должно содержать ровно ${length} символов',
        min: 'Это поле должно содержать минимум ${min} символов',
        max: 'Это поле должно содержать максимум ${max} символов',
        matches: 'Это поле должно соответствовать следующему: "${regex}"',
        email: 'Некорректный адрес электронной почты',
        url: 'Это поле должно быть корректным URL',
        trim: 'Это поле должно быть обрезанной строкой',
        lowercase: 'Должно быть строкой в нижнем регистре',
        uppercase: 'Должно быть строкой в верхнем регистре',
    },
    number: {
        min: 'Число должно быть больше или равно ${min}',
        max: 'Число должно быть меньше или равно ${max}',
        lessThan: 'Число должно быть меньше чем ${less}',
        moreThan: 'Число должно быть больше чем ${more}',
        positive: 'Должно быть положительным числом',
        negative: 'Должно быть отрицательным числом',
        integer: 'Должно быть целым числом',
    },
    date: {
        min: 'Должно быть позже ${min}',
        max: 'Должно быть раньше ${max}',
    },
    boolean: {
        isValue: 'Это поле должно быть ${value}',
    },
    object: {
        noUnknown: 'Это поле содержит неопределенные ключи: ${unknown}',
    },
    array: {
        min: 'Это поле должно содержать как минимум ${min} элементов',
        max: 'Это поле должно содержать как максимум ${max} элементов',
    },
});

// Export Yup for use in your application
export {
    string,
    ObjectSchema,
    setLocale,
    number,
    object,
    ref,
    array,
    mixed,
    boolean,
};
