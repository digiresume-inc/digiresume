'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@dr/ui/components/base/button';
import { Input } from '@dr/ui/components/base/input';
import { blurFade } from '@dr/utils';
import { usernameSchema } from '@dr/schemas';
import { IdCard, Loader2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ToastSuccess } from '@/components/general/toast';
import { updateUsername } from '@/app/onboarding/action';
import { motion } from 'motion/react';

const UsernameSet = ({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>> }) => {
  const form = useForm<z.infer<typeof usernameSchema>>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: '',
    },
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      form.setValue('username', storedUsername, { shouldDirty: true });
      form.setFocus('username');
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting, isDirty },
  } = form;

  return (
    <div className="flex flex-col items-start justify start px-3 py-2 gap-4 w-full">
      <h1 className="text-lg lg:text-xl font-semibold flex gap-2 items-center justify-center">
        <IdCard className="w-4 h-4 lg:w-6 lg:h-6" strokeWidth={1} /> Select Username
      </h1>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(async (data) => {
          const result = await updateUsername(data);
          if (!result.success) {
            reset(data);
            setError(
              'username',
              { type: 'manual', message: result.message },
              { shouldFocus: true }
            );
            return;
          }

          ToastSuccess({ message: result.message });
          localStorage.removeItem('username');
          setStep(2);
        })}
      >
        <div className="w-full max-w-82">
          <div className="flex items-center justify-start border rounded-md">
            <span className="text-sm font-medium text-muted-foreground bg-secondary px-2 py-2 rounded-l-md border-muted border-r">
              digiresu.me
            </span>
            <Input
              id="username"
              type="text"
              placeholder="username"
              autoComplete="off"
              {...register('username')}
              className="w-full text-sm rounded-none rounded-r-md bg-secondary"
            />
          </div>

          {form.formState.errors.username && (
            <motion.p
              variants={blurFade}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="text-xs lg:text-sm text-red-500 mt-1 ml-1 font-medium"
            >
              {form.formState.errors.username.message}
            </motion.p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full max-w-82"
          disabled={!isDirty || isSubmitting}
          variant={'outline'}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" /> Updating...
            </>
          ) : (
            <>Update Username</>
          )}
        </Button>
      </form>
    </div>
  );
};

export default UsernameSet;
