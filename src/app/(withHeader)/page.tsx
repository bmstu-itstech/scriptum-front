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
import type { Blueprint } from '@/shared/api/generated/data-contracts';
import { useSearchScripts } from '@/hooks/script/useSearchScripts';
import { Loading } from '@/shared/Loading';
import { useGetUserMe } from '@/hooks/user/useGetUserMe';
import { Filter } from '@/components/Filter/Filter';
import { FilterIcon } from '@/components/icons/FilterIcon';
import { pageSelectStyles, ownerFilterUsecase } from '@/components/Filter/Filter.usecase';

export type OwnerFilterValue = 'all' | 'mine' | 'others';

const ITEMS_PER_PAGE = 6;

interface ScriptWithRefetch extends Blueprint {
  refetch: () => void;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [ownerFilter, setOwnerFilter] = useState<OwnerFilterValue>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const { data: userData } = useGetUserMe();

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

  const dataByOwner = useMemo(() => {
    if (!data || !userData?.id) {
      return data ?? [];
    }
    if (ownerFilter === 'all') {
      return data;
    }
    if (ownerFilter === 'mine') {
      return data.filter((s) => s.ownerID === userData.id);
    }
    return data.filter((s) => s.ownerID !== userData.id);
  }, [data, ownerFilter, userData?.id]);

  const totalPages = useMemo(() => {
    if (!dataByOwner) {
      return 1;
    }
    return Math.max(1, Math.ceil(dataByOwner.length / ITEMS_PER_PAGE));
  }, [dataByOwner]);
  const paginatedScripts = useMemo(() => {
    if (!dataByOwner) {
      return [];
    }
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const scriptsWithRefetch: ScriptWithRefetch[] = dataByOwner
      .map((script) => ({
        ...script,
        refetch: refetch,
      }))
      .slice(startIndex, startIndex + ITEMS_PER_PAGE);
    return scriptsWithRefetch;
  }, [dataByOwner, currentPage, refetch]);

  return (
    <PageLayout title={mainPageUsecase.title} subtitle={mainPageUsecase.subtitle}>
      <div className={styles.controlPanel}>
        <div className={styles.searchFilterGroup}>
          <Search
            callback={(value) => {
              setSearchTerm(value);
              setCurrentPage(1);
            }}
            className={styles.search}
            icon={<SearchIcon />}
            placeholder={searchUsecase.placeholder}
          />
          <Filter
            placeholder='Все'
            name='ownerFilter'
            style={pageSelectStyles}
            value={ownerFilter}
            onChange={(value) => {
              setOwnerFilter(value as OwnerFilterValue);
              setCurrentPage(1);
            }}
            options={ownerFilterUsecase}
            icon={<FilterIcon />}
            className={styles.filter}
          />
        </div>
        <Stats
          stats={[
            { text: 'Всего скриптов', count: allScripts ? allScripts.length : 0 },
            {
              text: 'Найдено',
              count: dataByOwner?.length ?? 0,
            },
            { text: 'Страница', count: currentPage, total: totalPages },
          ]}
          className={styles.stats}
        />
      </div>
      {isLoading || searchLoading ? (
        <Loading />
      ) : (
        <>
          <ScriptPanel scripts={paginatedScripts} currentUserId={userData?.id} />

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
