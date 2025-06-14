'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { loginSchema } from '@dr/schemas';
import { loginUser } from './action';

import { Card, CardHeader, CardContent } from '@dr/ui/components/base/card';
import { Label } from '@dr/ui/components/base/label';
import { Input } from '@dr/ui/components/base/input';
import { SubmitButton } from '@/components/general/submitbutton';
import GoogleSignin from './googlesignin';
import { ToastError, ToastSuccess } from '@/components/general/toast';

const LoginForm = ({ username }: { username: string | string[] }) => {
  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username as string);
    }
  }, [username]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setServerError(null);
    setIsLoading(true);
    try {
      const response = await loginUser(data);
      if (response.error) {
        setServerError(response.message);
      } else {
        ToastSuccess({ message: response.message });
        router.push('/');
      }
    } catch {
      setServerError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-sm w-full">
      <CardHeader className="space-y-1">
        <img src="/text_logo.png" className="w-34 object-cover mx-auto" />
      </CardHeader>
      <CardContent>
        <GoogleSignin isMagicLoading={isLoading} />

        <div className="flex items-center space-x-2 mt-4 mb-4">
          <hr className="flex-grow border-t border-lightsecondary-border dark:border-secondary-border" />
          <span className="text-card-foreground/50 text-xs">OR</span>
          <hr className="flex-grow border-t border-lightsecondary-border dark:border-secondary-border" />
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              {...form.register('email')}
              disabled={isLoading}
              className="text-sm lg:text-base"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
          {serverError && <p className="text-sm text-destructive">{serverError}</p>}
          <SubmitButton className="w-full" pending={isLoading} loadingText="Logging in...">
            Login
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
