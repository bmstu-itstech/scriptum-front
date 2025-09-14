import { memo, type FC } from 'react';
import { Props } from './ScriptParametrsLoaderPreblock.props'
import styles from './ScriptParametrsLoaderPreblock.module.css'
import { DocumentNoParamsIcon } from '@/components/icons/DocumentNoParamsIcon';
import cn from 'classnames'
import { pageCreateUsecase } from '@/app/(withHeader)/script/create/page.usecase';

export const ScriptParametersLoaderPreblock: FC<Props> = memo(({ isEmpty, type }) => {

    if (isEmpty) {
        return (
            <div className={styles.preblock}>
                <DocumentNoParamsIcon className={styles.preblock__icon} />
                <p className={styles.preblock__text}>Параметры не добавлены</p>
                <p className={styles.preblock__subtext}>
                    Нажмите &quot;Добавить параметр&quot; для начала
                </p>
            </div>
        );
    }

    return (
        <div className={cn(styles.headerList, styles.listBorder)}>
            {(type === 'input' ? pageCreateUsecase.input.blocks : pageCreateUsecase.output.blocks).map(
                (block, ind) => (
                    <p key={ind} className={cn(`layout__title-sm`, styles.headerItem)}>
                        {block}
                    </p>
                ),
            )}
        </div>

    )
})