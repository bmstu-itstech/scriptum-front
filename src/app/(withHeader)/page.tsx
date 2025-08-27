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
import Pagination from '@/shared/Pagination';
import { Stats } from '@/shared/Stats';
import { useGetAllScripts } from '@/hooks/script/useGetAllScripts';
import type { IScript } from '@/domain/entities/script';
import { useSearchScripts } from '@/hooks/script/useSearchScripts';

const ITEMS_PER_PAGE = 6;

interface ScriptWithRefetch extends IScript {
  refetch: () => void;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const {
    data: allScripts,
    isLoading,
    refetch,
  } = useGetAllScripts({
    enabled: debouncedSearchTerm.length === 0,
  });

  const { data: filteredScripts, isLoading: searchLoading } = useSearchScripts(
    debouncedSearchTerm.toLowerCase(),
    {
      enabled: debouncedSearchTerm.length > 0,
    },
  );

  const data = useMemo(() => {
    return debouncedSearchTerm.length > 0 ? filteredScripts : allScripts;
  }, [debouncedSearchTerm, allScripts, filteredScripts]);

  const totalPages = useMemo(() => {
    return data ? Math.ceil(data.length / ITEMS_PER_PAGE) : 1;
  }, [data, ITEMS_PER_PAGE]);
  const paginatedScripts = useMemo(() => {
    if (!data) {
      return [];
    }
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const scriptsWithRefetch: ScriptWithRefetch[] = data
      .map((script) => ({
        ...script,
        refetch: refetch,
      }))
      .slice(startIndex, startIndex + ITEMS_PER_PAGE);
    return scriptsWithRefetch;
  }, [data, currentPage, refetch]);

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
          { text: 'Всего скриптов', count: allScripts ? allScripts.length : 0 },
          {
            text: 'Найдено',
            count:
              debouncedSearchTerm.length > 0 && filteredScripts
                ? filteredScripts.length
                : data
                  ? data.length
                  : 0,
          },
          { text: 'Страница', count: currentPage, total: totalPages },
        ]}
        className={styles.stats}
      />
      {isLoading || searchLoading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <>
          <ScriptPanel scripts={paginatedScripts} />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className={styles.pagination}
            />
          )}
        </>
      )}
    </PageLayout>
  );
}
