'use client'
import { FC, useState } from "react"
import { Props } from "./UserRow.props"
import { EditUserData, UserRole } from "@/shared/consts/user"
import { UserInfoCell } from "../cells/UserInfoCell"
import { PasswordCell } from "../cells/PasswordCell"
import { RoleCell } from "../cells/RoleCell"
import { ActionsCell } from "../cells/ActionsCell"
import { validateEmail, validateFullname, validatePassword } from "@/utils/validators"
import generalStyle from './../../UserTable.module.css'

export const UserRow: FC<Props> = ({ user, onEditUser, onDeleteUser }) => {
	const [isEditing, setIsEditing] = useState(false)
	const [editData, setEditData] = useState<EditUserData>({
		fullname: user.fullname,
		email: user.email,
		password: '',
		confirmPassword: '',
		role: user.role
	})
	const [errors, setErrors] = useState<Record<string, string | null>>({})

	const handleEdit = () => {
		setIsEditing(true)
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
		setIsEditing(false)
		setErrors({})
	}

	const handleSave = () => {
		if (!validateForm()) return

		const editedUser = {
			id: user.id,
			fullname: editData.fullname,
			email: editData.email,
			role: editData.role,
			...(editData.password ? { password: editData.password } : {})
		}

		onEditUser(editedUser)
		setIsEditing(false)
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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!editData) return

		if (e.target.name === 'password' && e.target.value === '') {
			setEditData({
				...editData,
				password: '',
				confirmPassword: ''
			})
		} else {
			setEditData({
				...editData,
				[e.target.name]: e.target.value
			})
		}

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
		<div className={generalStyle.tableRow}>
			<UserInfoCell
				isEditing={isEditing}
				editData={editData}
				errors={errors}
				user={user}
				onInputChange={handleInputChange}
				onInputBlur={handleBlur}
			/>

			<PasswordCell
				isEditing={isEditing}
				editData={editData}
				errors={errors}
				onInputChange={handleInputChange}
				onInputBlur={handleBlur}
			/>

			<RoleCell
				isEditing={isEditing}
				editData={editData}
				user={user}
				onRoleChange={handleRoleChange}
			/>

			<ActionsCell
				isEditing={isEditing}
				errors={errors}
				onEdit={handleEdit}
				onCancel={handleCancel}
				onSave={handleSave}
				onDelete={() => onDeleteUser(user.id)}
			/>
		</div>
	)
}
