'use client'
import { FC, useState } from "react"
import styles from './UserTableLayout.module.css'
import cn from "classnames"
import { IUser, UserRole } from "@/shared/consts/user"
import { Props } from "./UserTableLayout.props"
import { ShieldIcon } from "@/components/icons/ShieldIcon"
import { UserIcon } from "@/components/icons/UserIcon"
import { DocumentIcon } from "@/components/icons/DocumentIcon"
import { CloseIcon } from "@/components/icons/CloseIcon"
import { EditIcon } from "@/components/icons/EditIcon"
import { DeleteIcon } from "@/components/icons/DeleteIcon"
import { validateEmail, validateFullname, validatePassword } from "@/utils/validators"

export const UserTableLayout: FC<Props> = ({
	users,
	className,
	onEditUser,
	onDeleteUser,
	...props
}) => {
	const [editingId, setEditingId] = useState<number | null>(null)
	const [editData, setEditData] = useState<{
		fullname: string
		email: string
		password: string
		confirmPassword: string
		role: UserRole
	} | null>(null)
	const [errors, setErrors] = useState<{
		email?: string | null
		password?: string | null
		fullname?: string | null
	}>({})

	const handleEdit = (user: IUser) => {
		setEditingId(user.id)
		setEditData({
			fullname: user.fullname,
			email: user.email,
			password: '',
			confirmPassword: '',
			role: user.role
		})
		setErrors({})
	}

	const handleCancel = () => {
		setEditingId(null)
		setEditData(null)
		setErrors({})
	}

	const validateForm = () => {
		if (!editData) return false

		const shouldValidatePassword = !!editData.password || !!editData.confirmPassword

		const newErrors = {
			email: validateEmail(editData.email),
			password: shouldValidatePassword
				? validatePassword(editData.password, editData.confirmPassword)
				: null,
			fullname: validateFullname(editData.fullname)
		}

		setErrors(newErrors)
		return !Object.values(newErrors).some(error => error !== null)
	}

	const handleSave = () => {
		if (!editingId || !editData || !validateForm()) return

		if (!confirm('Вы уверены, что хотите сохранить изменения?')) return

		const editedUser = {
			id: editingId,
			fullname: editData.fullname,
			email: editData.email,
			role: editData.role,
			...(editData.password ? { password: editData.password } : {})
		}

		onEditUser(editedUser)
		setEditingId(null)
	}

	const handleDelete = (userId: number) => {
		if (!confirm('Вы уверены, что хотите удалить этого пользователя?')) return
		onDeleteUser(userId)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!editData) return

		setEditData({
			...editData,
			[e.target.name]: e.target.value
		})

		if (errors[e.target.name as keyof typeof errors]) {
			setErrors({
				...errors,
				[e.target.name]: null
			})
		}
	}

	const handleBlur = (field: 'email' | 'password' | 'fullname') => {
		if (!editData) return

		if (field === 'password') {
			const shouldValidatePassword = !!editData.password || !!editData.confirmPassword
			setErrors(prev => ({
				...prev,
				password: shouldValidatePassword
					? validatePassword(editData.password, editData.confirmPassword)
					: null
			}))
			return
		}

		setErrors(prev => ({
			...prev,
			[field]: field === 'email'
				? validateEmail(editData.email)
				: validateFullname(editData.fullname)
		}))
	}

	const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!editData) return
		setEditData({
			...editData,
			role: e.target.checked ? UserRole.ADMIN : UserRole.USER
		})
	}

	return (
		<div className={cn(styles.usersTable, className)} {...props}>
			<div className={styles.tableHeader}>
				<p className={styles.headerCell}>ПОЛЬЗОВАТЕЛЬ</p>
				<p className={styles.headerCell}>ПАРОЛЬ</p>
				<p className={styles.headerCell}>РОЛЬ</p>
				<p className={styles.headerCell}>ДЕЙСТВИЯ</p>
			</div>

			{users.map((user) => (
				<div key={user.id} className={styles.tableRow}>
					<div className={styles.userCell}>
						{editingId === user.id ? (
							<>
								<input
									type="text"
									name="fullname"
									value={editData?.fullname || ''}
									onChange={handleInputChange}
									onBlur={() => handleBlur('fullname')}
									className={cn(styles.editInput, {
										[styles.invalidInput]: errors.fullname
									})}
									placeholder="ФИО"
									required
								/>
								{errors.fullname && (
									<span className={styles.errorMessage}>{errors.fullname}</span>
								)}
								<input
									type="email"
									name="email"
									value={editData?.email || ''}
									onChange={handleInputChange}
									onBlur={() => handleBlur('email')}
									className={cn(styles.editInput, {
										[styles.invalidInput]: errors.email
									})}
									placeholder="Email"
									required
								/>
								{errors.email && (
									<span className={styles.errorMessage}>{errors.email}</span>
								)}
							</>
						) : (
							<>
								<p className={styles.userName}>{user.fullname}</p>
								<p className={styles.userEmail}>{user.email}</p>
							</>
						)}
					</div>
					<div className={styles.passwordCell}>
						{editingId === user.id ? (
							<>
								<input
									type="password"
									name="password"
									value={editData?.password || ''}
									onChange={handleInputChange}
									onBlur={() => handleBlur('password')}
									className={cn(styles.editInput, {
										[styles.invalidInput]: errors.password
									})}
									placeholder="Новый пароль (необязательно)"
								/>
								{editData?.password && (
									<input
										type="password"
										name="confirmPassword"
										value={editData?.confirmPassword || ''}
										onChange={handleInputChange}
										onBlur={() => handleBlur('password')}
										className={cn(styles.editInput, {
											[styles.invalidInput]: errors.password
										})}
										placeholder="Повторите пароль"
									/>
								)}
								{errors.password && (
									<span className={styles.errorMessage}>{errors.password}</span>
								)}
							</>
						) : (
							<p className={styles.passwordPlaceholder}>••••••••</p>
						)}
					</div>
					<div className={styles.roleCell}>
						{editingId === user.id ? (
							<label className={styles.roleCheckbox}>
								<input
									type="checkbox"
									checked={editData?.role === UserRole.ADMIN}
									onChange={handleRoleChange}
								/>
								<span className={styles.checkmark}></span>
								<span className={styles.roleLabel}>Администратор</span>
							</label>
						) : user.role === UserRole.ADMIN ? (
							<>
								<ShieldIcon className={styles.roleAdminIcon} />
								<span className={styles.roleAdmin}>Администратор</span>
							</>
						) : (
							<>
								<UserIcon className={styles.roleUserIcon} />
								<span className={styles.roleUser}>Пользователь</span>
							</>
						)}
					</div>
					<div className={styles.actionsCell}>
						{editingId === user.id ? (
							<>
								<button
									onClick={handleSave}
									disabled={Object.values(errors).some(error => error !== null)}
									className={cn(styles.actionButton, styles.saveIcon, {
										[styles.disabledButton]: Object.values(errors).some(error => error !== null)
									})}
									title="Сохранить"
								>
									<DocumentIcon />
								</button>
								<button
									onClick={handleCancel}
									className={cn(styles.actionButton, styles.cancelIcon)}
									title="Отменить"
								>
									<CloseIcon />
								</button>
							</>
						) : (
							<>
								<button
									onClick={() => handleEdit(user)}
									className={cn(styles.actionButton, styles.editIcon)}
									title="Редактировать"
								>
									<EditIcon />
								</button>
								<button
									onClick={() => handleDelete(user.id)}
									className={cn(styles.actionButton, styles.delIcon)}
									title="Удалить"
								>
									<DeleteIcon />
								</button>
							</>
						)}
					</div>
				</div>
			))}
		</div>
	)
}
