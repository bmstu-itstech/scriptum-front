'use client'

import { PageLayout } from '@/layouts/PageLayout'
import { APIScripts, mainPageUsecase } from '@/app/(withHeader)/page.usecase'
import { ScriptPanel } from '@/components/ScriptsPanel'
import { Search } from '@/components/Search'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { searchUsecase } from '@/components/Search/Search.usecase'
import styles from '@/app/(withHeader)/page.module.css'
import { useDebounce } from 'use-debounce'
import { useMemo, useState } from 'react'
import { Pagination } from '@/shared/Pagination'
import { Stats } from '@/shared/Stats'

const ITEMS_PER_PAGE = 6;

export default function Home() {
	const [scripts, setScripts] = useState(APIScripts)
	const [searchTerm, setSearchTerm] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [debouncedSearchTerm] = useDebounce(searchTerm, 300)

	const handleDeleteScript = (scriptId: number) => {
		// API //
		setScripts(prevScripts => prevScripts.filter(script => script.scriptId !== scriptId))
	}

	const filteredScripts = useMemo(() => {
		return scripts.filter(script => {
			const searchLower = debouncedSearchTerm.toLowerCase()
			return (
				script.scriptTitle.toLowerCase().includes(searchLower) ||
				script.subtitle.toLowerCase().includes(searchLower)
			)
		})
	}, [debouncedSearchTerm, scripts])

	const totalPages = Math.ceil(filteredScripts.length / ITEMS_PER_PAGE) || 1
	const paginatedScripts = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
		return filteredScripts.slice(startIndex, startIndex + ITEMS_PER_PAGE)
	}, [filteredScripts, currentPage])

	return (
		<PageLayout title={mainPageUsecase.title} subtitle={mainPageUsecase.subtitle}>
			<Search
				callback={(value) => {
					setSearchTerm(value)
					setCurrentPage(1)
				}}
				className={styles.page__search}
				icon={<SearchIcon />}
				placeholder={searchUsecase.placeholder}
			/>

			<Stats
				stats={[
					{ text: "Всего скриптов", count: APIScripts.length },
					{ text: "Найдено", count: filteredScripts.length },
					{ text: "Страница", count: currentPage, total: totalPages }
				]}
				className={styles.stats}
			/>

			<ScriptPanel
				scripts={paginatedScripts}
				onDeleteScript={handleDeleteScript}
			/>

			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
					className={styles.pagination}
				/>
			)}
		</PageLayout>
	)
}
