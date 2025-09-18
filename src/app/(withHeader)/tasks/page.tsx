'use client';
import { useState, useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import { Search } from '@/components/Search';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { Filter } from '@/components/Filter/Filter';
import { FilterIcon } from '@/components/icons/FilterIcon';
import { ITEMS_PER_PAGE, PipelineStatus } from '@/shared/consts/pipeline';
import { PipelineLayout } from '@/layouts/PipelineLayout';
import style from './page.module.css';
import { PageLayout } from '@/layouts/PageLayout';
import Pagination from '@/shared/Pagination';
import { Stats } from '@/shared/Stats';
import { pageSelectStyles, statusUsecase } from '@/components/Filter/Filter.usecase';
import { useGetJobs } from '@/hooks/job/useGetJobs';
import { tasksPageUsecase } from '@/app/(withHeader)/tasks/page.usecase';
import { getInputText, getOutputText, getStatus } from '@/utils/send';
import { Loading } from '@/shared/Loading';

export default function TasksPage() {
  const { data, isLoading } = useGetJobs();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PipelineStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const filteredPipelines = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.filter((pipeline) => {
      const searchLower = debouncedSearchTerm.toLowerCase();
      const matchesSearch =
        `${pipeline.job.script_name}`.toLowerCase().includes(searchLower) ||
        `${pipeline.job.script_name}`.toLowerCase().includes(searchLower);
      const matchesStatus =
        statusFilter === 'all' || getStatus(pipeline.job.status, pipeline?.code) === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, debouncedSearchTerm, statusFilter]);

  const totalPages = useMemo(() => {
    if (!filteredPipelines) {
      return 1;
    }
    return Math.max(1, Math.ceil(filteredPipelines.length / ITEMS_PER_PAGE));
  }, [filteredPipelines]);
  const paginatedPipelines = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPipelines?.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPipelines, currentPage]);

  if (!data || isLoading) {
    return <Loading />;
  }

  return (
    <PageLayout
      title={tasksPageUsecase.title}
      subtitle={tasksPageUsecase.subtitle}
      className={style.container}>
      <div className={style.controlPanel}>
        <div className={style.searchFilterGroup}>
          <Search
            placeholder='Поиск по названию скрипта или номеру задачи...'
            callback={(value) => {
              setSearchTerm(value);
              setCurrentPage(1);
            }}
            icon={<SearchIcon />}
            className={style.search}
          />

          <Filter
            placeholder='Все статусы'
            name='statusFilter'
            style={pageSelectStyles}
            value={statusFilter}
            onChange={(value) => {
              setStatusFilter(value as PipelineStatus | 'all');
              setCurrentPage(1);
            }}
            options={statusUsecase}
            icon={<FilterIcon />}
            className={style.filter}
          />
        </div>

        <Stats
          stats={[
            { text: 'Найдено', count: filteredPipelines?.length },
            { text: 'Страница', count: currentPage, total: totalPages },
          ]}
        />
      </div>

      <div className={style.pipelines}>
        {paginatedPipelines.length > 0 ? (
          paginatedPipelines.map((pipeline) => (
            <PipelineLayout
              key={pipeline.job.job_id}
              status={getStatus(pipeline.job.status, pipeline?.code)}
              scriptNumber={`${pipeline.job.job_id}`}
              scriptName={pipeline.job.script_name}
              timeStart={pipeline.job.created_at}
              timeFinish={pipeline.job.finished_at}
              input={getInputText(pipeline.job)}
              output={pipeline.error_message ? pipeline.error_message : getOutputText(pipeline)}
            />
          ))
        ) : (
          <div className={style.emptyState}>
            Ничего не найдено. Попробуйте изменить параметры поиска
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className={style.paginationContainer}
      />
    </PageLayout>
  );
}
