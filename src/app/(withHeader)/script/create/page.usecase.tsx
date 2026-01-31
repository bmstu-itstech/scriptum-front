import { Button } from '@/shared/Button';
import styles from '@/app/(withHeader)/script/create/page.module.css';
import cn from 'classnames';
import { AddParametrIcon } from '@/components/icons/AddParametricon';
import * as Yup from 'yup';

export const pageCreateUsecase = {
  main: {
    header: <p className='layout__title-sm'>Основная информация</p>,
    blocks: {
      scriptTitle: {
        title: 'Название скрипта *',
        placeholder: 'Введите название скрипта',
      },
      scriptCode: {
        title: 'Tar-архив (.tar, .tar.gz, .tgz) *',
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
    .min(1, 'Название должно иметь хотя бы 2 символа')
    .max(50, 'Название должно быть меньше 50 символов')
    .required('Название обязательно'),
  desc: Yup.string()
    .min(1, 'Описание должно иметь хотя бы 2 символа')
    .max(50, 'Описание должно быть меньше 50 символов')
    .required('Описание обязательно'),
  type: Yup.string()
    .min(1, 'Тип должен иметь хотя бы 2 символа')
    .max(50, 'Тип должен быть меньше 50 символов')
    .required('Тип обязателен'),
  measure: Yup.string()
    .min(1, 'Единица измерения должна иметь хотя бы 2 символа')
    .max(50, 'Единица измерения должна быть меньше 50 символов')
    .required('Единица измерения обязательна'),
});

export const ScriptSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Название должно иметь хотя бы 2 символа')
    .max(50, 'Название должно быть меньше 50 символов')
    .required('Название обязательно'),
  desc: Yup.string().max(50, 'Описание должно быть меньше 50 символов'),
  inputParams: Yup.array().of(ParametrSheme),
  outputParams: Yup.array().of(ParametrSheme),
  // parameter['type']: Yup.string(),
  // type: Yup.string()
  //   .min(2, 'Тип должен иметь хотя бы 2 символа')
  //   .max(50, 'Тип должен быть меньше 50 символов')
  //   .required('Тип обязателен'),
  // measure: Yup.string()
  //   .min(2, 'Единица измерения должна иметь хотя бы 2 символа')
  //   .max(50, 'Единица измерения должна быть меньше 50 символов')
  //   .required('Единица измерения обязательна'),
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
  inputParams: ParameterWithId[];
  outputParams: ParameterWithId[];
}

export const ScriptInitialValues: ScriptFormValues = {
  name: '',
  desc: '',
  file: null,
  inputParams: [],
  outputParams: [],
};
