'use client'

import { PageLayout } from '@/layouts/PageLayout';
import { APIScripts, mainPageUsecase } from '@/app/(withHeader)/page.usecase';
import { ScriptPanel } from '@/components/ScriptsPanel';
import { Search } from '@/components/Search';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { searchUsecase } from '@/components/Search/Search.usecase';
import styles from '@/app/(withHeader)/page.module.css';
import { useDebounce } from 'use-debounce';
import { useMemo, useState } from 'react';

export default function Home() {
	const [searchTerm, setSearchTerm] = useState('');
	const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

	const filteredScripts = useMemo(() => {
		return APIScripts.filter(script => {
			const searchLower = debouncedSearchTerm.toLowerCase();

			const matchesSearch =
				script.scriptTitle.toLowerCase().includes(searchLower) ||
				script.subtitle.toLowerCase().includes(searchLower);

			return matchesSearch;
		});
	}, [debouncedSearchTerm]);

	return (
		<PageLayout title={mainPageUsecase.title} subtitle={mainPageUsecase.subtitle}>
			<Search
				callback={setSearchTerm}
				className={styles.page__search}
				icon={<SearchIcon />}
				placeholder={searchUsecase.placeholder}
			/>

			<ScriptPanel scripts={filteredScripts} allScriptsLen={APIScripts.length} />
		</PageLayout>
	);
}
