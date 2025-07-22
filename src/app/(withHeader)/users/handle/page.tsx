'use client'
import { PageLayout } from "@/layouts/PageLayout"
import { APIUsers, handleUsersPageUsecase } from './page.usecase'
import { Search } from '@/components/Search'
import { Filter } from '@/components/Filter/Filter'
import { useMemo, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { FilterIcon } from '@/components/icons/FilterIcon'
import { Stats } from '@/shared/Stats'
import { UserRole } from '@/shared/consts/user'
import { Pagination } from '@/shared/Pagination'
import { UserTableLayout } from '@/layouts/UserTableLayout'
import style from './page.module.css'
import { UserTable } from "@/components/UserTable"

const ITEMS_PER_PAGE = 8

export default function HandlePage() {
	const [users, setUsers] = useState(APIUsers)
	const [searchTerm, setSearchTerm] = useState('')
	const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all')
	const [currentPage, setCurrentPage] = useState(1)
	const [debouncedSearchTerm] = useDebounce(searchTerm, 300)

	const filteredUsers = useMemo(() => {
		return users.filter(user => {
			const searchLower = debouncedSearchTerm.toLowerCase()
			const matchesSearch =
				user.fullname.toLowerCase().includes(searchLower) ||
				user.email.toLowerCase().includes(searchLower)
			const matchesRole = roleFilter === 'all' || user.role === roleFilter
			return matchesSearch && matchesRole
		})
	}, [users, debouncedSearchTerm, roleFilter])

	const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE) || 1
	const paginatedUsers = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
		return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE)
	}, [filteredUsers, currentPage])

	const adminCount = users.filter(u => u.role === UserRole.ADMIN).length

	const handleEditUser = (editedUser: typeof users[0]) => {
		setUsers(users.map(u => u.id === editedUser.id ? editedUser : u))
	}

	const handleDeleteUser = (userId: number) => {
		setUsers(users.filter(u => u.id !== userId))
		if (paginatedUsers.length === 1 && currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}
	}

	return (
		<PageLayout
			title={handleUsersPageUsecase.title}
			subtitle={handleUsersPageUsecase.subtitle}
			className={style.container}
		>
			<div className={style.controlPanel}>
				<div className={style.searchFilterGroup}>
					<Search
						placeholder="Поиск по имени или email..."
						callback={(value) => {
							setSearchTerm(value)
							setCurrentPage(1)
						}}
						icon={<SearchIcon />}
						className={style.search}
					/>

					<Filter
						placeholder="Все роли"
						callback={(value) => {
							setRoleFilter(value as UserRole | 'all')
							setCurrentPage(1)
						}}
						options={[
							{ value: 'all', label: 'Все роли' },
							{ value: UserRole.ADMIN, label: 'Администраторы' },
							{ value: UserRole.USER, label: 'Пользователи' },
						]}
						icon={<FilterIcon />}
						className={style.filter}
					/>
				</div>

				<Stats
					stats={[
						{ text: "Всего пользователей", count: users.length },
						{ text: "Администраторов", count: adminCount },
						{ text: "Найдено", count: filteredUsers.length },
						{ text: "Страница", count: currentPage, total: totalPages }
					]}
				/>
			</div>

			<div className={style.usersList}>
				{paginatedUsers.length > 0 ? (
					<UserTable
						users={paginatedUsers}
						onEditUser={handleEditUser}
						onDeleteUser={handleDeleteUser}
					/>
				) : (
					<div className={style.emptyState}>
						Ничего не найдено. Попробуйте изменить параметры поиска
					</div>
				)}
			</div>

			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
					className={style.paginationContainer}
				/>
			)}
		</PageLayout>
	)
}
