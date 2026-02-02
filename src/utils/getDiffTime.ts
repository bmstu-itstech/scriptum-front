export function parseUTCAsLocal(dateStr: string | Date): Date {
  if (typeof dateStr !== 'string') {
    return dateStr;
  }

  return new Date(dateStr);
}

export function formatDuration(createdAt: string | Date, end: string | Date): string {
  const createdDate = parseUTCAsLocal(createdAt);
  const endDate = parseUTCAsLocal(end);

  let diffSec = Math.floor((endDate.getTime() - createdDate.getTime()) / 1000);

  if (diffSec < 0) {
    diffSec = 0;
  }

  const hours = Math.floor(diffSec / 3600);
  const minutes = Math.floor((diffSec % 3600) / 60);
  const seconds = diffSec % 60;
  const parts = [];
  if (hours > 0) {
    parts.push(`${hours} ч.`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} мин.`);
  }
  if (hours === 0) {
    parts.push(`${seconds} сек.`);
  }

  return parts.join(' ');
}
