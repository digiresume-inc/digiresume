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

const LoginForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
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
        <CardTitle className="text-lg lg:text-2xl font-bold">Login</CardTitle>
        <CardDescription className='text-sm lg:text-base'>Enter your email and password to login to your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              {...form.register('email')}
              disabled={isLoading}
              className='text-sm lg:text-base'
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="&#42;&#42;&#42;&#42;&#42;&#42;&#42;&#42;&#42;&#42;"
              {...form.register('password')}
              disabled={isLoading}
              className='text-sm lg:text-base'
            />
            {form.formState.errors.password && (
              <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
            )}
          </div>
          {serverError && <p className="text-sm text-destructive">{serverError}</p>}
          <SubmitButton className="w-full" pending={isLoading} loadingText="Logging in...">
            Login
          </SubmitButton>
          <div className="flex items-center space-x-2">
            <hr className="flex-grow border-t border-lightsecondary-border dark:border-secondary-border" />
            <span className="text-card-foreground/50 text-xs">OR</span>
            <hr className="flex-grow border-t border-lightsecondary-border dark:border-secondary-border" />
          </div>

          <GoogleSignin text="in" />
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
