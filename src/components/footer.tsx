import Link from 'next/link';
import { Mail, Phone } from 'lucide-react'; // Using Phone for WhatsApp for now

export default function Footer() {
  return (
    <footer className="w-full py-6 md:py-8 border-t bg-card text-card-foreground">
      <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Policy Insights AI. Todos los derechos
          reservados.
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/privacy-policy"
            className="text-sm hover:text-primary transition-colors"
          >
            Aviso de Privacidad
          </Link>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <a
              href="mailto:contacto@seguroconia.com"
              className="text-sm hover:text-primary transition-colors"
            >
              contacto@seguroconia.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" /> {/* Replace with WhatsApp icon if available */}
            <a
              href="https://wa.me/34614514140" // Replace with actual WhatsApp link
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-primary transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
