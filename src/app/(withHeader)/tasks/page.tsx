'use client'
import { pipelines, tasksPageUsecase } from "./page.usecase";
import { useState, useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import { Search } from "@/components/Search";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { Filter } from "@/components/Filter/Filter";
import { FilterIcon } from "@/components/icons/FilterIcon";
import { PipelineStatus } from "@/shared/consts/pipeline";
import { PipelineLayout } from "@/layouts/PipelineLayout";
import style from './page.module.css';
import { PageLayout } from "@/layouts/PageLayout";

export default function TasksPage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState<PipelineStatus | 'all'>('all');
	const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

	const filteredPipelines = useMemo(() => {
		return pipelines.filter(pipeline => {
			const searchLower = debouncedSearchTerm.toLowerCase();

			const matchesSearch =
				pipeline.scriptName.toLowerCase().includes(searchLower) ||
				pipeline.scriptNumber.toLowerCase().includes(searchLower);

			const matchesStatus = statusFilter === 'all' || pipeline.status === statusFilter;

			return matchesSearch && matchesStatus;
		});
	}, [debouncedSearchTerm, statusFilter]);

	return (
		<PageLayout
			title={tasksPageUsecase.title}
			subtitle={tasksPageUsecase.subtitle}
			className={style.container}
		>
			<div className={style.controlPanel}>
				<div className={style.searchFilterGroup}>
					<Search
						placeholder="Поиск по названию скрипта или номеру задачи..."
						callback={setSearchTerm}
						icon={<SearchIcon />}
						className={style.search}
					/>

					<Filter
						placeholder="Все статусы"
						callback={(value) => setStatusFilter(value as PipelineStatus | 'all')}
						options={[
							{ value: 'all', label: 'Все статусы' },
							{ value: PipelineStatus.OK, label: 'Успешно' },
							{ value: PipelineStatus.ERROR, label: 'Ошибка' },
							{ value: PipelineStatus.RUNNING, label: 'Выполняется' },
						]}
						icon={<FilterIcon />}
						className={style.filter}
					/>
				</div>

				<div className={style.stats}>
					<span className={style.counter}>Найдено: {filteredPipelines.length}</span>
					<span className={style.divider}>|</span>
					<span className={style.counter}>Всего: {pipelines.length}</span>
				</div>
			</div>

			<div className={style.pipelines}>
				{filteredPipelines.length > 0 ? (
					filteredPipelines.map((pipeline) => (
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
		</PageLayout>
	);
}
