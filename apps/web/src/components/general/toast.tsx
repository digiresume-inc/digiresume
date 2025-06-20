import { toast } from 'sonner';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';

const theme = {
  foreground: '#fafafa',
  background: '#08090a',
  primary: '#737373',
  card: '#191919',
  border: '#383838',
  secondary: '#262626',
  successAccent: '#8bc49c', // green-tinted accent
  errorAccent: '#d17a6e', // reddish accent
};

function hexToHSL(hex: string, alpha = 1): string {
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

export const ToastError = ({
  message,
  duration = 2000,
}: {
  message: string;
  duration?: number;
}) => {
  const toastId = toast.error(message, {
    duration,
    icon: <AlertTriangle color={theme.errorAccent} size={18} />,
    style: {
      background: theme.secondary,
      color: theme.foreground,
      border: `1px solid ${hexToHSL(theme.primary, 0.6)}`,
      borderRadius: '10px',
      padding: '14px 18px',
    },
    cancel: (
      <X
        onClick={() => toast.dismiss(toastId)}
        className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
        size={16}
      />
    ),
  });
};

export const ToastSuccess = ({
  message,
  duration = 2000,
}: {
  message: string;
  duration?: number;
}) => {
  const toastId = toast.success(message, {
    duration,
    icon: <CheckCircle color={theme.successAccent} size={18} />,
    style: {
      background: theme.secondary,
      color: theme.foreground,
      border: `1px solid ${hexToHSL(theme.primary, 0.6)}`,
      borderRadius: '10px',
      padding: '14px 18px',
    },
    cancel: (
      <X
        onClick={() => toast.dismiss(toastId)}
        className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
        size={16}
      />
    ),
  });
};
