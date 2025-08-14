import * as Yup from 'yup';


const in_fieldsSchema = Yup.object({
    type: Yup.string().required('Название обязательно'),
    data: Yup.string().required('Данные обязательны').min(1, 'Минимум 1 символ').max(50, 'Максимум 50 символов'),
})

export const runScriptValidationSchema = Yup.object({
    in_params: Yup.array().of(in_fieldsSchema),
    notify_by_email: Yup.boolean(),
})