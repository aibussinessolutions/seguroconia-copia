import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function AuthCodeError() {
  return (
     <div className="flex min-h-screen flex-col">
       <Header />
       <main className="flex flex-grow items-center justify-center p-4">
         <Card className="w-full max-w-md shadow-lg text-center">
           <CardHeader>
              <div className="mx-auto bg-destructive/20 rounded-full p-3 w-fit">
               <AlertTriangle className="w-8 h-8 text-destructive" />
             </div>
             <CardTitle className="text-2xl font-bold mt-4">Error de Autenticación</CardTitle>
             <CardDescription>
               No se pudo completar el proceso de inicio de sesión.
             </CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
             <p className="text-muted-foreground">
               El enlace de autenticación puede haber expirado o ser inválido. Por favor, intenta iniciar sesión de nuevo.
             </p>
             <Link href="/auth" passHref>
               <Button className="w-full">Volver a Inicio de Sesión</Button>
             </Link>
           </CardContent>
         </Card>
       </main>
       <Footer />
     </div>
  );
}
