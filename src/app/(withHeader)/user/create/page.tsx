'use client';
import style from './page.module.css'
import { PageLayout } from "@/layouts/PageLayout"
import { createUserPageUsecase, createUserSectionUsecase } from './page.usecase';
import { InputLayout } from '@/layouts/InputLayout';
import InputLayoutStyle from '@/layouts/InputLayout/InputLayout.module.css';
import { SectionLayout } from '@/layouts/SectionLayout';
import { ShieldIcon } from '@/components/icons/ShieldIcon';
import { Button } from '@/layouts/Button';
import { SaveIcon } from '@/components/icons/SaveIcon';
import { useState, useCallback, ChangeEvent } from 'react';
import { validateEmail, validateFullname, validatePassword } from '@/utils/validators';
import { PopupLayout } from '@/layouts/PopupLayout';

export default function TasksPage() {
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		password: '',
		confirmPassword: '',
		isAdmin: false
	});

	const [errors, setErrors] = useState({
		fullName: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const handleChange = useCallback((field: string, value: string | boolean) => {
		setFormData(prev => ({
			...prev,
			[field]: value
		}));

		if (typeof value === 'string' && errors[field as keyof typeof errors]) {
			setErrors(prev => ({
				...prev,
				[field]: ''
			}));
		}
	}, [errors]);

	const validateField = useCallback((field: string, value: string) => {
		let error = '';

		switch (field) {
			case 'fullName':
				error = validateFullname(value) ?? '';
				break;
			case 'email':
				error = validateEmail(value) ?? '';
				break;
			case 'password':
				error = validatePassword(value, formData.confirmPassword) ?? '';
				if (error === 'Пароли не совпадают') error = ''
				break;
			case 'confirmPassword':
				if (value && formData.password && value !== formData.password) {
					error = 'Пароли не совпадают';
				}
				break;
		}

		setErrors(prev => ({
			...prev,
			[field]: error
		}));

		return !error;
	}, [formData.password, formData.confirmPassword]);

	const handleBlur = useCallback((field: string) => {
		if (field === 'password' || field === 'confirmPassword') {
			validateField('password', formData.password);
			validateField('confirmPassword', formData.confirmPassword);
		} else {
			validateField(field, formData[field as keyof typeof formData] as string);
		}
	}, [formData, validateField]);

	const validateForm = useCallback(() => {
		let isValid = true;
		const newErrors = {
			fullName: validateFullname(formData.fullName) ?? '',
			email: validateEmail(formData.email) ?? '',
			password: validatePassword(formData.password, formData.confirmPassword) ?? '',
			confirmPassword: ''
		};

		if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Пароли не совпадают';
			if (newErrors.password === 'Пароли не совпадают') newErrors.password = ''
			isValid = false;
		}

		setErrors(newErrors);
		return isValid && !Object.values(newErrors).some(error => error);
	}, [formData]);

	const [popup, setPopup] = useState<{
		visible: boolean
		variant: 'success' | 'error' | 'warning'
		title: string
		description?: string
	} | null>(null)

	const showPopup = (variant: 'success' | 'error' | 'warning', title: string, description?: string) => {
		setPopup({ visible: true, variant, title, description })
		setTimeout(() => setPopup(null), 5000)
	}

	const handleSubmit = useCallback((e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			// API formData //
			showPopup('success', 'Готово!', 'Аккаунт пользователя успешно создан');
			setFormData({
				fullName: '',
				email: '',
				password: '',
				confirmPassword: '',
				isAdmin: false
			})
		}
	}, [formData, validateForm]);

	return (<>
		{popup && (
			<PopupLayout
				variant={popup.variant}
				title={popup.title}
				description={popup.description || ''}
				onClose={() => setPopup(null)}
			/>
		)}

		<PageLayout
			title={createUserPageUsecase.title}
			subtitle={createUserPageUsecase.subtitle}
			className={style.container}
		>
			<form onSubmit={handleSubmit}>
				<SectionLayout
					title={createUserSectionUsecase.title}
					subtitle={createUserSectionUsecase.subtitle}
				>
					<div className={style.createUserInput}>
						<p className={style.label}>Полное имя</p>
						<InputLayout
							value={formData.fullName}
							onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('fullName', e.target.value)}
							onBlur={() => handleBlur('fullName')}
							isPassword={false}
							isRequired={true}
							placeholder={'Введите полное имя (ФИО)'}
							errorText={errors.fullName}
							className={errors.fullName && InputLayoutStyle.error}
						/>
					</div>
					<div className={style.createUserInput}>
						<p className={style.label}>Email адрес</p>
						<InputLayout
							value={formData.email}
							onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
							onBlur={() => handleBlur('email')}
							isPassword={false}
							isRequired={true}
							placeholder={'Введите email адрес'}
							errorText={errors.email}
							className={errors.email && InputLayoutStyle.error}
						/>
					</div>
					<div className={style.createUserInput}>
						<p className={style.label}>Пароль</p>
						<InputLayout
							value={formData.password}
							onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('password', e.target.value)}
							onBlur={() => handleBlur('password')}
							isPassword={true}
							isRequired={true}
							placeholder={'Введите пароль'}
							errorText={errors.password}
							className={errors.password && InputLayoutStyle.error}
						/>
					</div>
					<div className={style.createUserInput}>
						<p className={style.label}>Повторите пароль</p>
						<InputLayout
							value={formData.confirmPassword}
							onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('confirmPassword', e.target.value)}
							onBlur={() => handleBlur('confirmPassword')}
							isPassword={true}
							isRequired={true}
							placeholder={'Введите еще раз пароль'}
							errorText={errors.confirmPassword}
							className={errors.confirmPassword && InputLayoutStyle.error}
						/>
					</div>
					<div className={style.permissionCheckbox}>
						<label className={style.checkboxContainer}>
							<input
								type="checkbox"
								className={style.checkboxInput}
								checked={formData.isAdmin}
								onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('isAdmin', e.target.checked)}
							/>
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
					<Button
						className={style.saveBtn}
						icon={<SaveIcon />}
					>
						Создать пользователя
					</Button>
				</SectionLayout>
			</form>

			<div className={style.infoSection}>
				<div>
					<div className={style.infoIcon}>
						<ShieldIcon width={16} height={16} />
					</div>
				</div>
				<div className={style.infoMain}>
					<p className={style.infoTitle}>Информация о правах доступа</p>
					<p className={style.infoAdmin}>
						<span className={style.infoStrong}>Обычный пользователь:</span> может создавать и запускать свои скрипты, просматривать свои задачи
					</p>
					<p className={style.infoUser}>
						<span className={style.infoStrong}>Администратор:</span> полный доступ ко всем функциям системы, включая управление пользователями
					</p>
				</div>
			</div>
		</PageLayout>
	</>);
};
