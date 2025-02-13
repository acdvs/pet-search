'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';
import { useFetch } from '@/lib/fetch';
import { useUser } from '@/lib/state';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  name: z.string(),
  email: z.string().email('Invalid email address'),
});

type TSchema = z.infer<typeof schema>;

function LoginForm({ className }: { className?: string }) {
  const _fetch = useFetch();
  const { setName } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  async function onSubmit(data: TSchema) {
    setIsLoading(true);

    try {
      await _fetch('/auth/login', {
        method: 'POST',
        body: data,
      });

      setName(data.name);
      router.push('/search');
    } catch (err) {
      if (err instanceof Error) {
        form.setError('root', { message: err.message });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(className, 'space-y-5')}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="my@email.com"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
