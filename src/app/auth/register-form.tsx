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
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const registerSchema = z.object({
  fullName: z.string().min(2, { message: 'El nombre completo es requerido.' }),
  email: z.string().email({ message: 'Email inválido.' }),
  phone: z.string().optional(), // Phone is optional
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.fullName,
          phone: values.phone,
        },
        // Optional: Email confirmation redirect URL
        // emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setIsLoading(false);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error de registro',
        description: error.message || 'Ocurrió un error inesperado.',
      });
    } else if (data.user && data.user.identities?.length === 0) {
        toast({
            variant: 'destructive',
            title: 'Error de registro',
            description: 'El usuario ya existe.', // More specific message
        });
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (signInError) {
        toast({
          variant: 'destructive',
          title: 'Error de inicio de sesión',
          description: signInError.message || 'No se pudo iniciar sesión automáticamente.',
        });
      } else {
        toast({
          title: 'Registro e inicio de sesión exitosos',
          description: 'Cuenta creada e iniciaste sesión automáticamente.',
        });
        router.push('/dashboard');       }
    }
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl>
                <Input placeholder="Juan Pérez" {...field} />
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
                <Input placeholder="tu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono (Opcional)</FormLabel>
              <FormControl>
                <Input placeholder="+1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
           {isLoading ? 'Registrando...' : 'Registrarse'}
        </Button>
      </form>
    </Form>
  );
}
