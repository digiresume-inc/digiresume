'use client';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { SiLinkedin } from 'react-icons/si';
import Image from 'next/image';
import { blurFade, formatLinkedInProfile, formatProxyCurlData } from '@dr/utils';
import { Info } from 'lucide-react';
import { Input } from '@dr/ui/components/base/input';
import { getAvatarUrl, updateLinkedinData } from '@/app/onboarding/action';
import { ToastError, ToastSuccess } from '@/components/general/toast';
import { useRouter } from 'next/navigation';
import { Button } from '@dr/ui/components/base/button';
import Loader from '@/components/general/loader';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { linkedinUsernameSchema } from '@dr/schemas';
import { cn } from '@dr/ui/lib/utils';

const LinkedinURLImport = ({
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const loadingMessages = ['Processing... ', 'Analyzing...  ', 'Structuring...'];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const router = useRouter();
  const [linkedinUsername, setLinkedinUsername] = useState<string>('');

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [loading]);


  const onSubmit = async (data: z.infer<typeof linkedinUsernameSchema>) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/proxycurl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: data.username }),
      });

      const dataObject = await res.json();

      // upload image to supabase
      const avatar_url = dataObject.data.profile_pic_url;
      const hosted_url = await getAvatarUrl(avatar_url);

      // update profile data
      const finalData = formatProxyCurlData(dataObject.data);
      
      const result = await updateLinkedinData(finalData,hosted_url.success, hosted_url.message);
      if (!result.success) {
        setError(result.message);
        return;
      }

      ToastSuccess({ message: 'Profile updated successfully.' });
      setModal('none');
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const form = useForm<z.infer<typeof linkedinUsernameSchema>>({
    resolver: zodResolver(linkedinUsernameSchema),
    defaultValues: {
      username: '',
    },
  });

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
            className="select-none relative z-50 w-full border border-foreground/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-[0%] data-[state=closed]:slide-out-to-top-[0%] data-[state=open]:slide-in-from-left-[0%] data-[state=open]:slide-in-from-top-[0%] rounded-lg md:w-full bg-background sm:align-middle sm:w-full sm:max-w-lg p-0 gap-0 pb-5 !block"
            style={{ pointerEvents: 'auto' }}
          >
            <div className="flex flex-col gap-1.5 text-center sm:text-left py-4 px-5 border-b">
              <h2 id="radix-:r9q:" className="text-base lm:eading-none font-normal">
                <span className="break-words flex items-center gap-2">
                  Linkedin URL Import <SiLinkedin />
                </span>
              </h2>
            </div>
            <motion.div
              variants={blurFade}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="py-4 px-5 overflow-hidden"
            >
              <div className="space-y-4">
                {error ||
                  (form.formState.errors.username && (
                    <span className="border border-destructive w-full px-2.5 py-1.5 h-fit bg-destructive/80 flex items-center rounded-md text-xs gap-2">
                      <Info size={18} strokeWidth={1} /> {error}
                      {form.formState.errors.username.message}
                    </span>
                  ))}
                <p className="text-sm">Get data from Linkedin URL</p>
                <Image
                  height={384}
                  width={1000}
                  className="w-full h-48 object-cover object-top rounded-lg border"
                  src="/general/linkedinurl.png"
                  alt="Linkedin Import Guide"
                />
                {loading ? (
                  <span className="flex items-center w-full justify-center opacity-70 gap-2 bg-secondary rounded-full py-2">
                    <Loader />

                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={loadingMessages[currentMessageIndex]}
                        variants={blurFade}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        {loadingMessages[currentMessageIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                ) : (
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="text-sm flex flex-col gap-2">
                      <label htmlFor="urlusername">Enter Linkedin username</label>
                      <div className="flex items-center justify-start border rounded-md">
                        <span className="text-sm font-medium text-muted-foreground bg-background px-2 py-2 rounded-l-md border-muted border-r">
                          https://linkedin.com/in/
                        </span>
                        <Input
                          id="urlusername"
                          type="text"
                          placeholder="username"
                          {...form.register('username')}
                          required
                          className={cn(
                            'w-full text-sm rounded-none rounded-r-md bg-background border',
                            form.formState.errors.username
                              ? 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50 focus-visible:ring-[3px]'
                              : 'border-input focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]'
                          )}
                        />
                      </div>
                      <Button type="submit" variant="default">
                        Update data
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
            <div className="w-full h-px" />
            <button
              disabled={loading}
              onClick={() => {
                setModal('none');
                setError('');
              }}
              className="cursor-pointer disabled:cursor-not-allowed absolute right-4 top-4 rounded-sm opacity-50 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none"
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

export default LinkedinURLImport;
