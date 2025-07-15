import { InputLayout } from '@/layouts/InputLayout';
import { LoginLogoIcon } from '../icons/LoginLogoIcon';
import styles from './Auth.module.css';
import { OpenEyeIcon } from '../icons/OpenEyeIcon';
import { CloseEyeIcon } from '../icons/CloseEyeIcon';
import cn from 'classnames';

export const authUsecase = {
	head: (
		<div className={cn(styles.header)}>
			<div className={styles.icon}>{<LoginLogoIcon />}</div>
			<div className={styles.content}>
				<h1 className={styles.title}>Вход</h1>
				<p className={styles.subtitle}>Войдите в систему управления скриптами</p>
			</div>
		</div>
	),
	center: (
		<>
			<InputLayout
				isPassword={false}
				isRequired={true}
				placeholder={"Введите ваш логин"}
				errorText={"Логин обязателен для заполнения"}
			/>
			<InputLayout
				isPassword={true}
				isRequired={true}
				placeholder={"Введите ваш пароль"}
				errorText={"Пароль обязателен для заполнения"}
				toggleIcons={{
					show: <OpenEyeIcon />,
					hide: <CloseEyeIcon />
				}}
			/>
		</>
	),
	tail: (
		<button>CLICK</button>
	)
}
