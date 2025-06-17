export const getLineHeightPercent = (rolesLength: number): string => {
  if (rolesLength === 1) return '14%';
  if (rolesLength === 2) return '46%';
  if (rolesLength === 3) return '59%';
  if (rolesLength === 4) return '68%';
  if (rolesLength === 5) return '74%';
  if (rolesLength === 6) return '78%';
  return `${Math.min(68 + (rolesLength - 4) * 5.5, 90)}%`; // fallback approximation
};

export function hexToHSL(hex: string, alpha = 1): string {
  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }

  return `hsla(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${alpha})`;
}
