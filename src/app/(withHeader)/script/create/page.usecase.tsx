import { Button } from '@/shared/Button';
import styles from '@/app/(withHeader)/script/create/page.module.css';
import cn from 'classnames';
import { AddIcon } from '@/components/icons/Addicon';
import { AddParametrIcon } from '@/components/icons/AddParametricon';
import * as Yup from 'yup'

export const pageCreateUsecase = {
  main: {
    header: <p className='layout__title-sm'>Основная информация</p>,
    blocks: {
      scriptTitle: {
        title: 'Название скрипта *',
        placeholder: 'Введите название скрипта',

      },
      scriptCode: {
        title: 'Python-файл (*.py) *',
        placeholder: 'Выберите Python-файл',
  
      },

      scriptDesc: {
        title: 'Описание *',
        placeholder: 'Опишите назначение и функцональность скрипта',

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

export const ScriptSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Название должно иметь хотя бы 2 символа')
    .max(50, 'Название должно быть меньше 50 символов')
    .required('Название обязательно'),
  desc: Yup.string()
    .min(2, 'Название должно иметь хотя бы 2 символа')
    .max(50, 'Название должно быть меньше 50 символов')
    .required('Описание обязательно'),
  file: Yup.mixed()
    .required('Скрипт обязателен')
    .test(
      'fileCount',
      'Можно загрузить только один файл',
      (value) => value && !Array.isArray(value)
    )

});