import {Button} from '@/shared/Button';
import styles from '@/app/(withHeader)/script/create/page.module.css';
import cn from 'classnames';
import {AddIcon} from '@/components/icons/Addicon';
import { AddParametrIcon } from '@/components/icons/AddParametricon';

export const pageCreateUsecase = {
  main: {
    header: <p className='layout__title-sm'>Основная информация</p>,
    blocks: {
      scriptTitle: {
        title: 'Название скрипта *',
        placeholder: 'Введите название скрипта',
        errorText: 'Название обязательно',
      },
      scriptCode: {
        title: 'Python-файл (*.py) *',
        placeholder: 'Выберите Python-файл',
        errorText: 'Скрипт обязателен',
      },

      scriptDesc: {
        title: 'Описание *',
        placeholder: 'Опишите назначение и функцональность скрипта',
        errorText: 'Описание обязательно',
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
