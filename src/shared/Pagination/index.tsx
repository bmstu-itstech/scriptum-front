'use client'
import { FC, useCallback } from 'react'
import cn from 'classnames'
import styles from './Pagination.module.css'
import { Props } from './Pagination.props'

export const Pagination: FC<Props> = ({
	currentPage,
	totalPages,
	onPageChange,
	maxVisiblePages = 3,
	className,
	...props
}) => {
	const handlePageChange = useCallback(
		(page: number) => {
			if (page >= 1 && page <= totalPages) {
				onPageChange(page)
			}
		},
		[onPageChange, totalPages]
	)

	const renderPageNumbers = () => {
		if (totalPages <= 1) return null;

		const pages: (number | string)[] = [];
		const halfVisible = Math.floor(maxVisiblePages / 2);

		pages.push(1);

		let startPage = Math.max(2, currentPage - halfVisible);
		let endPage = Math.min(totalPages - 1, currentPage + halfVisible);

		if (currentPage - halfVisible < 2) {
			endPage = Math.min(maxVisiblePages, totalPages - 1);
		}
		if (currentPage + halfVisible >= totalPages) {
			startPage = Math.max(2, totalPages - maxVisiblePages + 1);
		}

		if (startPage > 2) {
			pages.push('...');
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		if (endPage < totalPages - 1) {
			pages.push('...');
		}

		if (totalPages > 1) {
			pages.push(totalPages);
		}

		return pages.map((page, index) => {
			if (page === '...') {
				return (
					<span
						key={`ellipsis-${index}`}
						className={styles.paginationEllipsis}
						aria-hidden="true"
					>
						...
					</span>
				);
			}

			return (
				<button
					key={page}
					onClick={() => onPageChange(page as number)}
					className={cn(styles.paginationButton, {
						[styles.active]: page === currentPage,
					})}
					aria-current={page === currentPage ? 'page' : undefined}
				>
					{page}
				</button>
			);
		});
	};

	if (totalPages <= 1) return null

	return (
		<div className={cn(styles.pagination, className)} {...props}>
			<button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className={styles.paginationButton}
				aria-label="Предыдущая страница"
			>
				Назад
			</button>

			{renderPageNumbers()}

			<button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className={styles.paginationButton}
				aria-label="Следующая страница"
			>
				Вперед
			</button>
		</div>
	)
}
