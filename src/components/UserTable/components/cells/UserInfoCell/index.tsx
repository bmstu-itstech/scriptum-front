'use client'
import { FC } from "react"
import styles from './UserInfoCell.module.css'
import { Props } from "./UserInfoCell.props"
import cn from "classnames"
import generalStyle from './../../../UserTable.module.css'

export const UserInfoCell: FC<Props> = ({
	isEditing,
	editData,
	errors,
	user,
	onInputChange,
	onInputBlur,
}) => {
	return (
		<div className={cn(generalStyle.rowCell, styles.userCell)}>
			{isEditing ? (
				<>
					<input
						type="text"
						name="fullname"
						value={editData.fullname}
						onChange={onInputChange}
						onBlur={() => onInputBlur('fullname')}
						className={cn(generalStyle.editInput, {
							[generalStyle.invalidInput]: errors.fullname
						})}
						placeholder="ФИО"
						required
					/>
					{errors.fullname && (
						<span className={generalStyle.errorMessage}>{errors.fullname}</span>
					)}
					<input
						type="email"
						name="email"
						value={editData.email}
						onChange={onInputChange}
						onBlur={() => onInputBlur('email')}
						className={cn(generalStyle.editInput, {
							[generalStyle.invalidInput]: errors.email
						})}
						placeholder="Email"
						required
					/>
					{errors.email && (
						<span className={generalStyle.errorMessage}>{errors.email}</span>
					)}
				</>
			) : (
				<>
					<p className={styles.userName}>{user.fullname}</p>
					<p className={styles.userEmail}>{user.email}</p>
				</>
			)}
		</div>
	)
}
