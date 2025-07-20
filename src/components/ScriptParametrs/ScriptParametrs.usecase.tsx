import cn from 'classnames';
import styles from '@/components/ScriptParametrs/ScriptParametrs.module.css';
import { GalkaIcon } from '@/components/icons/GalkaIcon';
import { AttentionIcon } from '@/components/icons/AttentionIcon';

export const ScriptParametersInputUsecase = {
	header: (
		<div className={styles.ScriptParametrs__header}>
			<h2 className={styles.ScriptParametrs__title}>
				<AttentionIcon />
				<p className='layout__title-sm'>Входные параметры</p>
			</h2>
			<h4 className='layout__subtitle'>Заполните необходимые параметры для запуска скрипта</h4>
		</div>
	),
};

export const ScriptParametersOutputUsecase = {
	header: (
		<div className={styles.ScriptParametrs__header}>
			<h2 className={styles.ScriptParametrs__title}>
				<GalkaIcon />
				<p className='layout__title-sm'>Выходные параметры</p>
			</h2>
			<h4 className='layout__subtitle'>Скрипт вернет следующие результаты после выполнения</h4>
		</div>
	),
};
