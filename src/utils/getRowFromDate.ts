import { parseUTCAsLocal } from '@/utils/getDiffTime';

export const getDate = (date: Date | string, withTime?: boolean): string => {
  if (typeof date === 'string') {
    date = parseUTCAsLocal(date);
  }
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Некорректный объект Date');
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
