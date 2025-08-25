'use client';

import { PageLayout } from '@/layouts/PageLayout';
import { mainPageUsecase } from '@/app/(withHeader)/page.usecase';
import { ScriptPanel } from '@/components/ScriptsPanel';
import { Search } from '@/components/Search';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { searchUsecase } from '@/components/Search/Search.usecase';
import styles from '@/app/(withHeader)/page.module.css';
import { useDebounce } from 'use-debounce';
import { useMemo, useState } from 'react';
import { Pagination } from '@/shared/Pagination';
import { Stats } from '@/shared/Stats';
import { useGetAllScripts } from '@/hooks/script/useGetAllScripts';
import type { IScript } from '@/domain/entities/script';

const ITEMS_PER_PAGE = 6;

interface ScriptWithRefetch extends IScript {
  refetch: () => void;
}

export default function Home() {
  const { data, isLoading, refetch } = useGetAllScripts();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const filteredScripts = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.filter((script) => {
      const searchLower = debouncedSearchTerm.toLowerCase();
      return (
        script.script_name.toLowerCase().includes(searchLower) ||
        script.script_description.toLowerCase().includes(searchLower)
      );
    });
  }, [debouncedSearchTerm, data?.length, isLoading]);

  const totalPages = Math.ceil(filteredScripts.length / ITEMS_PER_PAGE) || 1;
  const paginatedScripts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const scriptsWithRefetch: ScriptWithRefetch[] = filteredScripts
      .map((script) => ({
        ...script,
        refetch: refetch,
      }))
      .slice(startIndex, startIndex + ITEMS_PER_PAGE);
    return scriptsWithRefetch;
  }, [filteredScripts, currentPage, refetch]);

  if (!data || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout title={mainPageUsecase.title} subtitle={mainPageUsecase.subtitle}>
      <Search
        callback={(value) => {
          setSearchTerm(value);
          setCurrentPage(1);
        }}
        className={styles.page__search}
        icon={<SearchIcon />}
        placeholder={searchUsecase.placeholder}
      />

      <Stats
        stats={[
          { text: 'Всего скриптов', count: data.length },
          { text: 'Найдено', count: filteredScripts.length },
          { text: 'Страница', count: currentPage, total: totalPages },
        ]}
        className={styles.stats}
      />

      <ScriptPanel scripts={paginatedScripts} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className={styles.pagination}
        />
      )}
    </PageLayout>
  );
}
