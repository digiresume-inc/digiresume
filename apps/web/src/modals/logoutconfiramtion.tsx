'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { logout } from '../actions/logout';
import { Button } from '@lf/ui/components/base/button';
import { LoadingButton } from '@/components/loadingbutton';

const LogoutConfirmation = ({
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      const response = await logout();

      if (response.success) {
        setLogoutLoading(false);
        setModal(false);
        router.refresh();
        router.push('/login');
      }
    } catch (error) {
      setLogoutLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {modal && (
        <div
          className="px-5 z-[10001] fixed h-full w-full flex items-center justify-center top-0 left-0 pointer-events-none bg-black/20 backdrop-blur"
          style={{ pointerEvents: 'auto' }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -50,
              opacity: 0,
            }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
            className="relative z-50 w-full border border-foreground/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-[0%] data-[state=closed]:slide-out-to-top-[0%] data-[state=open]:slide-in-from-left-[0%] data-[state=open]:slide-in-from-top-[0%] rounded-lg md:w-full bg-secondary sm:align-middle sm:w-full sm:max-w-sm p-0 gap-0 pb-5 !block"
            style={{ pointerEvents: 'auto' }}
          >
            <div className="flex flex-col gap-1.5 text-center sm:text-left py-4 px-5 border-b">
              <h2 id="radix-:r9q:" className="text-base lm:eading-none font-normal">
                <span className="break-words">Confirm Logout</span>
              </h2>
            </div>
            <div className="py-4 px-5 overflow-hidden">
              <div className="space-y-4">
                <p className="text-sm">Are you sure you want to logout of your account?</p>
              </div>
            </div>
            <div className="w-full h-px" />
            <div className="flex gap-2 px-5 pt-5">
              <Button onClick={() => setModal(false)} variant={'ghost'} className="w-1/2">
                {' '}
                <span className="truncate">Cancel</span>{' '}
              </Button>
              <LoadingButton
                variant={'destructive'}
                onClick={() => handleLogout()}
                loadingText="Logging out..."
                className="w-1/2 cursor-pointer"
                pending={logoutLoading}
              >
                <span className="truncate">Logout</span>
              </LoadingButton>
            </div>
            <button
              onClick={() => setModal(false)}
              type="button"
              className="cursor-pointer absolute right-4 top-4 rounded-sm opacity-50 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  disabled:pointer-events-none "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x h-4 w-4"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LogoutConfirmation;
