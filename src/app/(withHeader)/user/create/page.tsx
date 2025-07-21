import style from './page.module.css'
import { PageLayout } from "@/layouts/PageLayout"
import { createUserPageUsecase, createUserSectionUsecase } from './page.usecase';
import { InputLayout } from '@/layouts/InputLayout';
import { SectionLayout } from '@/layouts/SectionLayout';
import { ShieldIcon } from '@/components/icons/ShieldIcon';
import { Button } from '@/layouts/Button';
import { SaveIcon } from '@/components/icons/SaveIcon';

export default function TasksPage() {
	return (
		<PageLayout
			title={createUserPageUsecase.title}
			subtitle={createUserPageUsecase.subtitle}
			className={style.container}
		>
			<SectionLayout
				title={createUserSectionUsecase.title}
				subtitle={createUserSectionUsecase.subtitle}
			>
				<div className={style.createUserInput}>
					<p className={style.label}>Полное имя *</p>
					<InputLayout
						isPassword={false}
						isRequired={true}
						placeholder={'Введите ваш логин'}
						errorText={'Логин обязателен для заполнения'}
					/>
				</div>
				<div className={style.createUserInput}>
					<p className={style.label}>Email адрес *</p>
					<InputLayout
						isPassword={true}
						isRequired={true}
						placeholder={'Введите ваш пароль'}
						errorText={'Пароль обязателен для заполнения'}
					/>
				</div>
				<div className={style.permissionCheckbox}>
					<label className={style.checkboxContainer}>
						<input type="checkbox" className={style.checkboxInput} />
						<span className={style.checkmark}></span>
						<div className={style.checkboxContent}>
							<div className={style.checkboxTitle}>
								<ShieldIcon className={style.checkboxIcon} />
								Права администратора
							</div>
							<p className={style.checkboxDescription}>
								Пользователь с правами администратора сможет создавать других пользователей,
								управлять скриптами всех пользователей и просматривать все задачи в системе.
							</p>
						</div>
					</label>
				</div>
				<Button className={style.saveBtn} icon={<SaveIcon />}>
					Создать пользователя
				</Button>

			</SectionLayout >

			<div className={style.infoSection}>
				<div>
					<div className={style.infoIcon}>
						<ShieldIcon width={16} height={16} />
					</div>
				</div>
				<div className={style.infoMain}>
					<p className={style.infoTitle}>Информация о правах доступа</p>
					<p className={style.infoAdmin}>
						<span className={style.infoStrong}>Обычный пользователь:</span> может создавать и запускать свои скрипты, просматривать свои задачи
					</p>
					<p className={style.infoUser}>
						<span className={style.infoStrong}>Администратор:</span> полный доступ ко всем функциям системы, включая управление пользователями
					</p>
				</div>
			</div>
		</PageLayout >
	);
};
