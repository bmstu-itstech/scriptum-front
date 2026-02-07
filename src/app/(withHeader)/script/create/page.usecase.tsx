import { Button } from '@/shared/Button';
import styles from '@/app/(withHeader)/script/create/page.module.css';
import cn from 'classnames';
import { AddParametrIcon } from '@/components/icons/AddParametricon';
import * as Yup from 'yup';
import { Visibility } from '@/shared/api/generated/data-contracts';

const trimString = (v: unknown) => (typeof v === 'string' ? v.trim() : v);

export const pageCreateUsecase = {
  main: {
    header: <p className='layout__title-sm'>Основная информация</p>,
    blocks: {
      scriptTitle: {
        title: 'Название скрипта *',
        placeholder: 'Введите название скрипта',
      },
      scriptCode: {
        title: 'tar-архив (.tar, .tar.gz, .tgz) *',
        placeholder: 'Выберите tar-архив',
      },

      scriptDesc: {
        title: 'Описание',
        placeholder: 'Опишите назначение и функциональность скрипта',
      },
    },
  },
  input: {
    header: (
      <div className={cn(styles.headerList, styles.justifyBetween)}>
        <p className={cn('layout__title-sm', styles.headerName)}>Входные параметры</p>
        <Button className={styles.addButton} icon={<AddParametrIcon className={styles.addIcon} />}>
          Добавить параметр
        </Button>
      </div>
    ),
    blocks: ['Название', 'Описание', 'Тип', 'Единица измерения', 'Действие'],
  },
  output: {
    header: <p className='layout__title-sm'>Выходные параметры</p>,
    blocks: ['Название', 'Описание', 'Тип', 'Единица измерения', 'Действие'],
  },
};

const ParametrSheme = Yup.object().shape({
  name: Yup.string()
    .transform(trimString)
    .min(1, 'Название должно иметь хотя бы 1 символ')
    .max(50, 'Название должно быть меньше 50 символов')
    .required('Название обязательно'),
  desc: Yup.string()
    .transform(trimString)
    .max(80, 'Описание должно быть меньше 80 символов')
    .optional(),
  type: Yup.string()
    .transform(trimString)
    .min(1, 'Тип должен иметь хотя бы 1 символ')
    .max(50, 'Тип должен быть меньше 50 символов')
    .required('Тип обязателен'),
  measure: Yup.string()
    .transform(trimString)
    .max(50, 'Единица измерения должна быть меньше 50 символов')
    .optional(),
});

export const ScriptSchema = Yup.object().shape({
  name: Yup.string()
    .transform(trimString)
    .min(1, 'Название должно иметь хотя бы 1 символ')
    .max(80, 'Название должно быть меньше 80 символов')
    .required('Название обязательно'),
  desc: Yup.string().transform(trimString).max(1000, 'Описание должно быть меньше 1000 символов'),
  inputParams: Yup.array().of(ParametrSheme),
  outputParams: Yup.array().of(ParametrSheme),
  file: Yup.mixed().required('Скрипт обязателен'),
});

export interface Parameter {
  name: string;
  desc: string;
  type: string;
  measure: string;
}

export interface ParameterWithId extends Parameter {
  id: number;
}

export interface ScriptFormValues {
  name: string;
  desc: string;
  file: File | null;
  visibility: Visibility;
  inputParams: ParameterWithId[];
  outputParams: ParameterWithId[];
}

export const ScriptInitialValues: ScriptFormValues = {
  name: '',
  desc: '',
  file: null,
  visibility: Visibility.Private,
  inputParams: [],
  outputParams: [],
};
