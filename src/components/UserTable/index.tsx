'use client'
import { FC, useState } from "react"
import styles from './UserTable.module.css'
import cn from "classnames"
import { IUser } from "@/shared/consts/user"
import { UserRow } from "./components/UserRow"
import { UserTableHeader } from "./components/UserTableHeader"
import { DialogLayout } from "@/layouts/DialogLayout"
import { PopupLayout } from "@/layouts/PopupLayout"
import { Props } from "./UserTable.props"

type PopupState = {
	visible: boolean;
	variant: 'success' | 'error' | 'warning';
	title: string;
	description?: string;
} | null

type DialogState = {
	visible: boolean;
	type: 'save' | 'delete';
	userId?: number;
	title: string;
	message: string;
	onConfirm: () => void;
} | null

export const UserTable: FC<Props> = ({
	users,
	className,
	onEditUser,
	onDeleteUser,
}) => {
	const [popup, setPopup] = useState<PopupState>(null)
	const [dialog, setDialog] = useState<DialogState>(null)

	const showPopup = (
		variant: 'success' | 'error' | 'warning',
		title: string,
		description?: string
	) => {
		setPopup({ visible: true, variant, title, description })
		setTimeout(() => setPopup(null), 5000)
	}

	const handleEditUser = (user: IUser) => {
		setDialog({
			visible: true,
			type: 'save',
			title: 'Подтвердите сохранение',
			message: `Вы уверены, что хотите сохранить изменения для пользователя ${user.email}?`,
			onConfirm: () => {
				onEditUser(user)
				showPopup('success', 'Изменения сохранены', `Данные пользователя ${user.email} обновлены`)
				setDialog(null)
			}
		})
	}

	const handleDeleteUser = (userId: number) => {
		const user = users.find(u => u.id === userId)
		if (!user) return

		setDialog({
			visible: true,
			type: 'delete',
			userId,
			title: 'Подтвердите удаление',
			message: `Вы уверены, что хотите удалить пользователя ${user.email}?`,
			onConfirm: () => {
				onDeleteUser(userId)
				showPopup('success', 'Пользователь удалён', `Пользователь ${user.email} был удалён`)
				setDialog(null)
			}
		})
	}

	return (
		<div className={cn(styles.container, className)}>
			{dialog && (
				<DialogLayout
					type="confirm"
					title={dialog.title}
					message={dialog.message}
					isVisible={dialog.visible}
					onClose={() => setDialog(null)}
					onConfirm={dialog.onConfirm}
					confirmText={dialog.type === 'save' ? 'Сохранить' : 'Удалить'}
					cancelText="Отмена"
				/>
			)}

			{popup && (
				<PopupLayout
					variant={popup.variant}
					title={popup.title}
					description={popup.description || ''}
					onClose={() => setPopup(null)}
				/>
			)}

			<div className={styles.usersTable}>
				<UserTableHeader />
				{users.map((user) => (
					<UserRow
						key={user.id}
						user={user}
						onEditUser={handleEditUser}
						onDeleteUser={handleDeleteUser}
					/>
				))}
			</div>
		</div>
	)
}
