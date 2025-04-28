'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';

const magicLinkSchema = z.object({
  email: z.string().email({ message: 'Email inválido.' }),
});

type MagicLinkFormValues = z.infer<typeof magicLinkSchema>;

export default function MagicLinkForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const form = useForm<MagicLinkFormValues>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: MagicLinkFormValues) {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: values.email,
      options: {
        // shouldCreateUser: false, // Set to true if you want to allow registration via Magic Link
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setIsLoading(false);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error al enviar Magic Link',
        description: error.message || 'Ocurrió un error inesperado.',
      });
    } else {
      toast({
        title: 'Magic Link Enviado',
        description: 'Revisa tu correo electrónico para el enlace de inicio de sesión.',
      });
      form.reset(); // Clear the form
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="tu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar Magic Link'}
        </Button>
      </form>
    </Form>
  );
}
