export function formatMonthYear(input: string) {
  if (!input) return '';
  const [month, year] = input.split('/');
  const date = new Date(`${year}-${month}-01`);
  return date.toLocaleString('en-US', { month: 'short', year: 'numeric' }); // e.g., Aug 2024
}

export function formatMonthShortYear(input: string) {
  if (!input) return '';
  const [month, year] = input.split('/');
  if (!month || !year) return '';
  const date = new Date(`${year}-${month}-01`);
  const shortMonth = date.toLocaleString('en-US', { month: 'short' });
  const shortYear = year ? year.slice(-2) : ''; // Get last 2 digits of year
  return `${shortMonth} ${shortYear}`; // e.g., Aug 24
}
