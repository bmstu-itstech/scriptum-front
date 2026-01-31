import { parseUTCAsLocal } from '@/utils/getDiffTime';

export const getDate = (date: Date | string | null | undefined, withTime?: boolean): string => {
	// Обработка пустых или некорректных значений
	if (!date) {
		return '—';
	}

	if (typeof date === 'string') {
		// Проверка на пустую строку после обрезки пробелов
		if (date.trim() === '') {
			return '—';
		}
		date = parseUTCAsLocal(date);
	}

	if (!(date instanceof Date) || isNaN(date.getTime())) {
		return '—';
	}
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	// console.log(date);
	if (withTime) {
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');
		const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
		return formattedDate;
	}
	const formattedDate = `${day}.${month}.${year}`;
	return formattedDate;
};
