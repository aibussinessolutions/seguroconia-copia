import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Upload,
  BrainCircuit,
  MessageSquare,
  FileText,
} from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col ">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-card flex justify-center items-center">
          <div className="container px-4 md:px-6 text-center flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary-foreground mb-4 max-w-3xl">
              Analiza tu Seguro con Inteligencia Artificial
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mb-8">
              Regístrate, sube tu póliza y descubre si estás protegido.
            </p>
            <Link href="/auth" passHref>
              <Button size="lg" className="text-lg">
                Registrarme
              </Button>
            </Link>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="w-full py-12 md:py-24 lg:py-32 bg-background flex justify-center items-center">
          <div className="container px-4 md:px-6 flex flex-col items-center">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12 max-w-3xl">
              Beneficios Destacados
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <FileText className="w-8 h-8 text-primary" />
                  <CardTitle>Diagnóstico Rápido y Preciso</CardTitle>
                </CardHeader>
                <CardContent>
                  Nuestra IA analiza tu póliza en minutos, identificando
                  coberturas clave y posibles vacíos.
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <BrainCircuit className="w-8 h-8 text-primary" />
                  <CardTitle>Recomendaciones Personalizadas</CardTitle>
                </CardHeader>
                <CardContent>
                  Recibe sugerencias claras y accionables para optimizar tu
                  protección según tus necesidades.
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <MessageSquare className="w-8 h-8 text-primary" />
                  <CardTitle>Asesoría Confidencial</CardTitle>
                </CardHeader>
                <CardContent>
                  Interactúa con la IA para aclarar dudas sobre tu póliza de
                  forma segura y privada.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-card flex justify-center items-center">
          <div className="container px-4 md:px-6 flex flex-col items-center">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12 max-w-3xl">
              ¿Cómo Funciona?
            </h2>
            <div className="grid gap-12 md:grid-cols-3 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-primary rounded-full p-4">
                  <Upload className="w-12 h-12 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">1. Sube tu Póliza</h3>
                <p className="text-muted-foreground">
                  Arrastra o selecciona tu archivo PDF de seguro.
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="bg-primary rounded-full p-4">
                  <BrainCircuit className="w-12 h-12 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">2. Análisis por IA</h3>
                <p className="text-muted-foreground">
                  Nuestra IA procesa tu documento de forma segura.
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="bg-primary rounded-full p-4">
                  <MessageSquare className="w-12 h-12 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">3. Obtén Resultados</h3>
                <p className="text-muted-foreground">
                  Recibe un diagnóstico y conversa con la IA sobre tu póliza.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}