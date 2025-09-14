import { memo, useState, type FC } from 'react';
import styles from './ScriptParametrsLoaderHeader.module.css'
import { Props } from './ScriptParametrsLoaderHeader.props'
import cn from 'classnames'
import { Button } from '@/layouts/Button';
import { AddParametrIcon } from '@/components/icons/AddParametricon';

export const ScriptParametrsLoaderHeader: FC<Props> = memo(({ params, type, push }) => {
    const [totalCount, setTotalCount] = useState(0)
    return (
        <div className={cn(styles.headerList, styles.justifyBetween)}>
            <div className={styles.headerList__left}>
                <p className={cn('layout__title-sm', styles.headerName)}>
                    {type === 'input' ? 'Входные параметры' : 'Выходные параметры'}
                </p>
                <p className={styles.headerList_subtitle}>Количество параметров: {params.length}</p>
            </div>

            <Button
                className={styles.addButton}
                onClick={() => {
                    push({
                        id: totalCount,
                        name: '',
                        desc: '',
                        type: '',
                        measure: '',
                    })
                    setTotalCount(prev => prev + 1);
                }
                }
                icon={<AddParametrIcon className={styles.addIcon} />}>
                Добавить параметр
            </Button>
        </div >
    )
})