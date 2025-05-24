export const getLineHeightPercent = (rolesLength: number): string => {
  if (rolesLength === 1) return '8%';
  if (rolesLength === 2) return '44%';
  if (rolesLength === 3) return '59%';
  if (rolesLength === 4) return '68%';
  if (rolesLength === 5) return '74%';
  if (rolesLength === 6) return '78%';
  return `${Math.min(68 + (rolesLength - 4) * 5.5, 90)}%`; // fallback approximation
};
