import { createClient } from '@/lib/supabase/server';
import AuthForm from './auth-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default async function AuthPage() {
  return (
    <div className="flex min-h-screen flex-col">
       <Header />
       <main className="flex flex-grow items-center justify-center p-4">
         <Card className="w-full max-w-md shadow-lg">
           <CardHeader className="text-center">
             <CardTitle className="text-2xl font-bold">Acceso de Usuario</CardTitle>
             <CardDescription>
               Inicia sesión o crea una cuenta para analizar tu póliza.
             </CardDescription>
           </CardHeader>
           <CardContent>
             <AuthForm />
           </CardContent>
         </Card>
       </main>
       <Footer />
     </div>
  );
}

