import { PageLayout } from '@/layouts/PageLayout';
import { mainPageUsecase } from '@/app/(withHeader)/page.usecase';
import { ScriptPanel } from '@/components/ScriptsPanel';
import { Search } from '@/components/Search';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { searchUsecase } from '@/components/Search/Search.usecase';
import styles from '@/app/(withHeader)/page.module.css';

export default function Home() {
	return (
		<PageLayout title={mainPageUsecase.title} subtitle={mainPageUsecase.subtitle}>
			<Search
				callback={async () => {
					'use server';
					// Your server logic here
				}}
				className={styles.page__search}
				icon={<SearchIcon />}
				placeholder={searchUsecase.placeholder}
			/>

			<ScriptPanel />
		</PageLayout>
	);
}
