'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './login-form';
import RegisterForm from './register-form';
import MagicLinkForm from './magic-link-form'; // Optional: Import if implementing Magic Link
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator'; // Import Separator

// Simple SVG for Google Icon
const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M21.35 11.1h-9.03v2.79h5.11c-.2 1.62-1.43 3.28-3.46 3.28-2.1 0-3.8-.88-3.8-1.98s1.7-1.98 3.8-1.98c1.1 0 1.93.37 2.45.83l1.9-1.82C17.1 9.37 15.24 8.5 13.02 8.5c-3.33 0-6.03 2.7-6.03 6s2.7 6 6.03 6c3.44 0 5.7-2.4 5.7-5.84 0-.47-.04-.93-.12-1.36z"/>
    <path fill="#34A853" d="M4.5 14.5c0-1.1.35-2.13.94-3.02l-2.18-1.7c-1.04 1.9-1.66 4.07-1.66 6.42s.62 4.52 1.66 6.42l2.18-1.7c-.59-.89-.94-1.92-.94-3.02z"/>
    <path fill="#FBBC05" d="M13.02 8.5c-1.32 0-2.5.5-3.4 1.36l-2.18-1.7C8.92 6.5 10.88 5.5 13.02 5.5c2.75 0 5.08 1.64 6.33 4.02l-2.15 1.66c-.52-.88-1.5-1.48-2.78-1.68z"/>
    <path fill="#EA4335" d="M13.02 17.5c1.37 0 2.54-.48 3.45-1.3l2.15 1.66c-1.24 1.18-2.97 1.94-4.97 1.94-2.14 0-4.1-.98-5.46-2.62l2.18-1.7c.88 1.04 2.08 1.68 3.48 1.68z"/>
    <path fill="none" d="M0 0h24v24H0z"/>
  </svg>
);


export default function AuthForm() {
  const [activeTab, setActiveTab] = useState('login');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const supabase = createClient();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
         // Ensure the redirectTo URL is dynamically generated based on the current location
         // This is crucial for correct redirection after Google authentication.
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setIsGoogleLoading(false);
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error de inicio de sesión con Google',
        description: error.message || 'No se pudo iniciar sesión con Google.',
      });
       console.error("Google Sign-In Error:", error);
    }
    // Supabase handles the redirect, no need for router push here
  };

  return (
    <div className="w-full space-y-6">
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GoogleIcon /> // Use GoogleIcon component
        )}
        {isGoogleLoading ? 'Redirigiendo...' : 'Continuar con Google'}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            O continuar con
          </span>
        </div>
      </div>


      <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
          <TabsTrigger value="register">Registrarse</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
          {/* Optional: Add Magic Link Option */}
          {/* <div className="mt-4 text-center text-sm">
            O inicia sesión con{' '}
            <button
              type="button"
              onClick={() => setActiveTab('magiclink')}
              className="underline text-primary"
            >
              Magic Link
            </button>
          </div> */}
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
        {/* Optional: Magic Link Form Content */}
        {/* <TabsContent value="magiclink">
          <MagicLinkForm />
          <div className="mt-4 text-center text-sm">
            O{' '}
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className="underline text-primary"
            >
              inicia sesión con contraseña
            </button>
            {' / '}
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className="underline text-primary"
            >
              registrate
            </button>
          </div>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
