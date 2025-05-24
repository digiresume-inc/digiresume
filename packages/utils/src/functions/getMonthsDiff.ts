export function getMonthsDifference(
  start?: string,
  end?: string
): string {
  if (!start || !end) return '';

  const [startMonthStr, startYearStr] = start.split('/');
  const [endMonthStr, endYearStr] = end.split('/');

  // Check all components are defined and valid numbers
  if (
    !startMonthStr || !startYearStr || !endMonthStr || !endYearStr
  ) {
    return '';
  }

  const startMonth = parseInt(startMonthStr, 10);
  const startYear = parseInt(startYearStr, 10);
  const endMonth = parseInt(endMonthStr, 10);
  const endYear = parseInt(endYearStr, 10);

  if (
    isNaN(startMonth) || isNaN(startYear) ||
    isNaN(endMonth) || isNaN(endYear)
  ) {
    return '';
  }

  const startDate = new Date(startYear, startMonth - 1);
  const endDate = new Date(endYear, endMonth - 1);

  let totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  if (totalMonths < 0) return '';

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const yearStr = years > 0 ? `${years}y` : '';
  const monthStr = months > 0 ? `${months}m` : '';

  return [yearStr, monthStr].filter(Boolean).join(' ');
}
