'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { loginSchema } from '@lf/utils';
import { loginUser } from './action';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@lf/ui/components/base/card';
import { Label } from '@lf/ui/components/base/label';
import { Input } from '@lf/ui/components/base/input';
import { SubmitButton } from '@/components/submitbutton';
import GoogleSignin from './googlesignin';
import { ToastError, ToastSuccess } from '@/components/toast';

const LoginForm = ({ username }: { username: string | string[] }) => {
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
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 lg:w-6 h-4 lg:h-6 bg-primary rounded-md"></div>
          <h1 className="text-xl lg:text-2xl font-extrabold">Linkfolio</h1>
        </div>
      </CardHeader>
      <CardContent>
        <GoogleSignin />

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
        <span onClick={() => ToastSuccess({ message: 'Success' })}>toast</span>
        <span onClick={() => ToastError({ message: 'Error' })}>error</span>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
