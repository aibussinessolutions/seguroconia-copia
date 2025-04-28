import Header from '@/components/header';
import Footer from '@/components/footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container px-4 md:px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Aviso de Privacidad</h1>
        <div className="prose prose-invert max-w-none text-foreground">
          <p>
            En Policy Insights AI, valoramos tu privacidad y estamos comprometidos
            a proteger tu información personal. Este Aviso de Privacidad explica
            cómo recopilamos, usamos, divulgamos y protegemos tu información
            cuando utilizas nuestro sitio web y servicios.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Información que Recopilamos</h2>
          <p>
            Podemos recopilar información personal que nos proporcionas
            directamente, como:
          </p>
          <ul>
            <li>
              <strong>Información de Registro:</strong> Nombre completo, dirección
              de correo electrónico, número de teléfono cuando creas una cuenta.
            </li>
            <li>
              <strong>Documentos de Póliza:</strong> Las pólizas de seguro en formato
              PDF que subes para análisis.
            </li>
            <li>
              <strong>Información de Uso:</strong> Cómo interactúas con nuestro
              sitio web y servicios.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">Cómo Usamos tu Información</h2>
          <ul>
            <li>Para proporcionar y mejorar nuestros servicios de análisis de pólizas.</li>
            <li>Para autenticar usuarios y gestionar cuentas.</li>
            <li>Para comunicarnos contigo sobre tu cuenta o nuestros servicios.</li>
            <li>Para cumplir con requisitos legales y proteger nuestros derechos.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">Compartir tu Información</h2>
          <p>
            No vendemos ni alquilamos tu información personal a terceros. Podemos
            compartir tu información con:
          </p>
          <ul>
            <li>
              <strong>Proveedores de Servicios:</strong> Como Supabase (para
              autenticación y almacenamiento) y n8n (para procesamiento de
              flujos de trabajo), quienes nos ayudan a operar nuestros servicios.
              Estos proveedores están obligados a proteger tu información.
            </li>
            <li>
              <strong>Requisitos Legales:</strong> Si es requerido por ley o para
              responder a procesos legales válidos.
            </li>
          </ul>
            <h2 className="text-xl font-semibold mt-6 mb-2">Seguridad de Datos</h2>
           <p>
             Implementamos medidas de seguridad razonables para proteger tu
             información contra acceso no autorizado, alteración, divulgación o
             destrucción. Sin embargo, ningún sistema es completamente seguro.
           </p>

           <h2 className="text-xl font-semibold mt-6 mb-2">Tus Derechos</h2>
           <p>
             Tienes derecho a acceder, corregir o eliminar tu información personal.
             Puedes gestionar la información de tu cuenta a través de tu panel de
             usuario o contactándonos directamente.
           </p>

           <h2 className="text-xl font-semibold mt-6 mb-2">Cambios a este Aviso</h2>
           <p>
             Podemos actualizar este Aviso de Privacidad ocasionalmente. Te
             notificaremos sobre cualquier cambio publicando el nuevo aviso en
             nuestro sitio web.
           </p>

           <h2 className="text-xl font-semibold mt-6 mb-2">Contáctanos</h2>
           <p>
             Si tienes alguna pregunta sobre este Aviso de Privacidad, por favor
             contáctanos en{' '}
             <a href="mailto:contacto@seguroconia.com" className="text-primary hover:underline">
               contacto@seguroconia.com
             </a>
             .
           </p>
          <p>
             <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
          </p>
           {/* Add more detailed privacy policy content here */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
