'use client';
import {APIPipelines, tasksPageUsecase} from './page.usecase';
import {useState, useMemo} from 'react';
import {useDebounce} from 'use-debounce';
import {Search} from '@/components/Search';
import {SearchIcon} from '@/components/icons/SearchIcon';
import {Filter} from '@/components/Filter/Filter';
import {FilterIcon} from '@/components/icons/FilterIcon';
import {ITEMS_PER_PAGE, PipelineStatus} from '@/shared/consts/pipeline';
import {PipelineLayout} from '@/layouts/PipelineLayout';
import style from './page.module.css';
import {PageLayout} from '@/layouts/PageLayout';
import {Pagination} from '@/shared/Pagination';
import {Stats} from '@/shared/Stats';
import {statusUsecase} from '@/components/Filter/Filter.usecase';

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PipelineStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const filteredPipelines = useMemo(() => {
    return APIPipelines.filter(pipeline => {
      const searchLower = debouncedSearchTerm.toLowerCase();
      const matchesSearch =
        pipeline.scriptName.toLowerCase().includes(searchLower) ||
        pipeline.scriptNumber.toLowerCase().includes(searchLower);
      const matchesStatus = statusFilter === 'all' || pipeline.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [debouncedSearchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredPipelines.length / ITEMS_PER_PAGE);
  const paginatedPipelines = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPipelines.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPipelines, currentPage]);

  return (
    <PageLayout
      title={tasksPageUsecase.title}
      subtitle={tasksPageUsecase.subtitle}
      className={style.container}>
      <div className={style.controlPanel}>
        <div className={style.searchFilterGroup}>
          <Search
            placeholder='Поиск по названию скрипта или номеру задачи...'
            callback={value => {
              setSearchTerm(value);
              setCurrentPage(1);
            }}
            icon={<SearchIcon />}
            className={style.search}
          />

          <Filter
            placeholder='Все статусы'
            name='statusFilter'
            value={statusFilter}
            callback={value => {
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
            {text: 'Найдено', count: filteredPipelines.length},
            {text: 'Страница', count: currentPage, total: totalPages},
          ]}
        />
      </div>

      <div className={style.pipelines}>
        {paginatedPipelines.length > 0 ? (
          paginatedPipelines.map(pipeline => (
            <PipelineLayout
              key={pipeline.id}
              status={pipeline.status}
              scriptNumber={pipeline.scriptNumber}
              scriptName={pipeline.scriptName}
              timeStart={pipeline.timeStart}
              duration={pipeline.duration}
              input={pipeline.input}
              output={pipeline.output}
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
