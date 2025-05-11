import { toast } from 'sonner';
import { X } from 'lucide-react';

export const ToastError = ({
  message,
  duration = 1500,
}: {
  message: string;
  duration?: number;
}) => {
  const toastId = toast.error(message, {
    duration: duration,
    style: {
      background: '#c5a587',
      color: '#b44c38',
      border: '1px solid #d6bfa9',
      borderRadius: '10px',
      padding: '15px',
    },
    cancel: (
      <X
        onClick={() => toast.dismiss(toastId)}
        className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-transparent text-primary-text/70 hover:text-primary-text/90 duration-200 transition-all ease-out"
        size={18}
      />
    ),
  });
};

export const ToastSuccess = ({
  message,
  duration = 1500,
}: {
  message: string;
  duration?: number;
}) => {
  const toastId = toast.success(message, {
    cancel: (
      <X
        onClick={() => toast.dismiss(toastId)}
        className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-transparent text-primary-text/70 hover:text-primary-text/90 duration-200 transition-all ease-out"
        size={18}
      />
    ),
    duration: duration,
    style: {
      background: '#c5a587',
      color: '#3b8b4c',
      border: '1px solid #d6bfa9',
      borderRadius: '10px',
      padding: '15px',
    },
  });
};
